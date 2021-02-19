import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
    //update the return to instead return a Promise with the data from the Express server
    return this.http.get(this.expressBaseUrl + endpoint).toPromise();
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
    var resourceEncoded = encodeURIComponent(resource);
    return this.sendRequestToExpress('/search/' + category + '/' + resourceEncoded).then((resource)=>{
      switch(category){
        case "artist":
          var result = resource["artists"]["items"].map((artistData) => {
            return new ArtistData(artistData);
          });
          return result;
        case "track":
          var result = resource["tracks"]["items"].map((trackData) => {
            return new TrackData(trackData);
          });
          return result;
        case "album":
          var result = resource["albums"]["items"].map((albumData) => {
            return new AlbumData(albumData);
          });
          return result;
      }
    });
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    var artistEncoded = encodeURIComponent(artistId);
    return this.sendRequestToExpress('/artist/' + artistEncoded).then((data) => {
      return new ArtistData(data);
    });
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
    var artistEncoded = encodeURIComponent(artistId);
    return this.sendRequestToExpress('/artist-related-artists/' + artistEncoded).then((data) => {
      var result = data["artists"].map((artistData) => {
        return new ArtistData(artistData);
      });
      return result;
    });
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    var artistEncoded = encodeURIComponent(artistId);
    return this.sendRequestToExpress('/artist-top-tracks/' + artistEncoded).then((data) => {
      var result = data["tracks"].map((trackData) => {
        return new TrackData(trackData);
      });
      return result;
    });
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    var artistEncoded = encodeURIComponent(artistId);
    return this.sendRequestToExpress('/artist-albums/' + artistEncoded).then((data) => {
      var result = data["items"].map((albumData) => {
        return new AlbumData(albumData);
      });
      return result;
    });
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    var albumEncoded = encodeURIComponent(albumId);
    return this.sendRequestToExpress('/album/' + albumEncoded).then((data) => {
      return new AlbumData(data);
    });
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    var albumEncoded = encodeURIComponent(albumId);
    return this.sendRequestToExpress('/album-tracks/' + albumEncoded).then((data) => {
      var result = data["items"].map((trackData) => {
        return new TrackData(trackData);
      });
      return result;
    });
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    var trackEncoded = encodeURIComponent(trackId);
    return this.sendRequestToExpress('/track/' + trackEncoded).then((data) => {
      return new TrackData(data);
    });
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    var trackEncoded = encodeURIComponent(trackId);
    return this.sendRequestToExpress('/track-audio-features/' + trackEncoded).then((data) => {
      var result = [];
      result.push(new TrackFeature('danceability', data['danceability']));
      result.push(new TrackFeature('energy', data['energy']));
      result.push(new TrackFeature('speechiness', data['speechiness']));
      result.push(new TrackFeature('acousticness', data['acousticness']));
      result.push(new TrackFeature('instrumentalness', data['instrumentalness']));
      result.push(new TrackFeature('liveness', data['liveness']));
      result.push(new TrackFeature('valence', data['valence']));
      return result;
    });
  }
}
