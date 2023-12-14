class Movie {
  constructor(
    id,
    movieName,
    category,
    description,
    published,
    movieImage,
    movieVideo
  ) {
    this.id = id;
    this.movieName = movieName;
    this.category = category;
    this.description = description;
    this.published = published;
    this.movieImage = movieImage;
    this.movieVideo = movieVideo;
  }
}
class Highlight {
  constructor(
    id,
    movieName,
    category,
    description,
    published,
    movieImage,
    movieVideo
  ) {
    this.id = id;
    this.movieName = movieName;
    this.category = category;
    this.description = description;
    this.published = published;
    this.movieImage = movieImage;
    this.movieVideo = movieVideo;
  }
}
class Wishlist {
  constructor(
    id,
    movieName,
    category,
    description,
    published,
    movieImage,
    movieVideo
  ) {
    this.id = id;
    this.movieName = movieName;
    this.category = category;
    this.description = description;
    this.published = published;
    this.movieImage = movieImage;
    this.movieVideo = movieVideo;
  }
}
class User {
  constructor(emailReg, usernameReg, passwordReg, profileReg) {
    this.emailReg = emailReg;
    this.usernameReg = usernameReg;
    this.passwordReg = passwordReg;
    this.profileReg = profileReg;
  }
}

export { Movie, Highlight, Wishlist, User };
