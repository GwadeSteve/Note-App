from django.urls import path
from .views import (
    NoteListView,
    NoteDetailView,
    NoteCreateView,
    NoteUpdateView,
    NoteDeleteView,
    NoteSearchView,
)

urlpatterns = [
    path('notes/', NoteListView.as_view(), name='note-list'),
    path('notes/<int:pk>/', NoteDetailView.as_view(), name='note-detail'),
    path('notes/create/', NoteCreateView.as_view(), name='note-create'),
    path('notes/update/<int:pk>/', NoteUpdateView.as_view(), name='note-update'),
    path('notes/delete/<int:pk>/', NoteDeleteView.as_view(), name='note-delete'),
    path('notes/search/', NoteSearchView, name='note-search'),
]
