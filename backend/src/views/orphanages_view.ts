import Orphanage from "../models/Orphanage";
import imagesView from './images_view';

export default {
  render(orphanage: Orphanage) {
    return {
        //Escolher os campos que vão aparecer
      id: orphanage.id,
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekdends: orphanage.open_on_weekdends,
      images: imagesView.renderMany(orphanage.images)
    };
  },

  renderMany(orphanages: Orphanage[]){
      return orphanages.map(orphanage => this.render(orphanage));
  }
};
