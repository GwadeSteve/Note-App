from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Note
from .serializers import NoteSerializer
from django.db.models import Q

class NoteListView(generics.ListAPIView):
    """
    Retrieve a list of notes belonging to the authenticated user.
    """
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user).order_by('-updated_at')

class NoteDetailView(generics.RetrieveAPIView):
    """
    Retrieve a single note belonging to the authenticated user.
    """
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)

class NoteCreateView(generics.CreateAPIView):
    """
    Create a new note for the authenticated user.
    """
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        return Response({'message': 'Note created successfully'}, status=status.HTTP_201_CREATED)

    def create(self, request, *args, **kwargs):
        request.data['user'] = request.user.id
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            return self.perform_create(serializer)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class NoteUpdateView(generics.UpdateAPIView):
    """
    Update an existing note belonging to the authenticated user.
    """
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Note updated successfully', 'data': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class NoteDeleteView(generics.DestroyAPIView):
    """
    Delete an existing note belonging to the authenticated user.
    """
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({'message': 'Note deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

    def delete(self, request, *args, **kwargs):
        try:
            return super().delete(request, *args, **kwargs)
        except Exception as e:
            return Response({'message': 'Failed to delete note', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class NoteSearchView(APIView):
    """
    Search for notes containing a specific query string.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        query = request.data.get('query', '')
        notes = Note.objects.filter(
            Q(title__icontains=query) | Q(content__icontains=query),
            user=request.user
        )
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)
