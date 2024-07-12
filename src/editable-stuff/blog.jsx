import { BlogBuilder } from "../components/blog/BlogBuilder";
const bloglist = [];

const blog = new BlogBuilder({
  title: "Cycling profiles",
  previewImage: { 
    src: require("../editable-stuff/blogpost-1_preview.png"),
    imageSize: {
      width:"50%",
      height:"50%"
    } 
  },
  description:
    "Information about my cycling addiction 😊",
})
  .addHeading("Applications")
  .addParagraph(
    "komoot: https://www.komoot.com/user/2275166299509"
  )
  .addParagraph(
    "strava: https://www.strava.com/athletes/39721809"
  )
  .addImages(
    {
      images:
      [
        { 
          src: require("../editable-stuff/blogpost-1_preview.png"), 
          label: "First slide label", 
          paragraph: "A picture drawn by my girlfriend Tata on the theme of my trip in Armenia And Georgia in 2023. Caucasus Crossing." 
        },
        { 
          src: require("../editable-stuff/skuill.png"), 
          label: "Second slide label", 
          paragraph: "Nulla vitae elit libero, a pharetra augue mollis interdum." 
        },
      ],
      imageSize: 
      {
        width:"615",
        height:"450"
      }
    }
  );

bloglist.push(blog);

export default bloglist;
