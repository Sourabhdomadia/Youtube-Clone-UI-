export const API_KEY = 'AIzaSyBZeZxs71G_QIazJHeNv3Pa1HDjRHJleJQ';

export const value_convertor = (value) => {
  if (value === null || value === undefined) {
    return '0';
  } else if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(1) + 'B';
  } else if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1) + 'M';
  } else if (value >= 1_000) {
    return (value / 1_000).toFixed(1) + 'K';
  } else {
    return value.toString();
  }
}