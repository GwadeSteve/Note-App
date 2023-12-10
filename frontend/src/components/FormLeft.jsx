import React from "react";
import RandomNote from "./RandomNote";

const FormLeft = ({page}) => {

    const Quotes = [
        {
          title: "Stars in the Night",
          quote: "Illuminate your thoughts like stars on a dark canvas; let your notes be the constellations of your journey, guiding you through the depths of creativity and imagination."
        },
        {
          title: "Inscribed Echoes",
          quote: "Inscribe your moments with ink, for within those notes lie the echoes of your dreams waiting to be unveiled—a symphony of memories yearning to fill the pages of your story."
        },
        {
          title: "Pages of Legacy",
          quote: "Every note holds a story, every thought a chapter; pen your narrative on the blank canvas of each page, crafting a legacy that speaks of your unique perspective and wisdom."
        },
        {
          title: "Melodies in Ink",
          quote: "Your notes, like melodies on a page, compose the symphony of your life's narrative—a beautiful medley of thoughts and emotions waiting to be written and sung."
        },
        {
          title: "Visionary Chronicles",
          quote: "Write your ideas, sketch your visions; in the pages of notes, you'll find the roadmap to your aspirations—a chronicle of ambitions waiting to transform into tangible realities."
        }
      ];
        
  return (
    
    <div>
      <h1>{page}</h1>
      <RandomNote quotes={Quotes} />
    </div>
  )
}

export default FormLeft;