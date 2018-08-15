
function parseHTML(string) {
  const html = string.replace(/<br \/>/g, '');
  return html;
}

var util = {
  parseHTML: function(string) {
    const html = string.replace(/<br \/>/g, '');
    return html;
  },
  getSlides: function(data){
    const slideContent = parseHTML(data.slide_content).split('&amp;&amp;&amp;');
    let slides = [];
    Object.keys(data).forEach(key => {
     let count = 0;
     if (key.includes('slide-image')) {
       const content = slideContent[count].split(',');
       const slide = {
         image: data[key],
         title: content[0],
         subtitle: content[1],
         button: content[2]
       }
       count++;
       slides.push(slide);
     }
   })
   return slides;
  },
  getCta: function(data){
    const content = parseHTML(data).split(',');
    return {
      cta_title: content[0],
      cta_subtitle: content[1],
      cta_button: content[2]
    }    
  }
}

module.exports = util
