import Image from "../models/Image";
export default {
  render(image: Image) {
    return {
        //Escolher os campos que vão aparecer
      id: image.id,
      url: `http://localhost:3333/uploads/${image.path}`,
      
    };
  },

  renderMany(images: Image[]){
      return images.map(image => this.render(image));
  }
};
