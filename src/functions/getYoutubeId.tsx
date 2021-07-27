export const getYoutubeId = (input: string) => {
  let id;
  try {
    id = input.match(
      /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\\/&]{10,12})/
    );
    return id ? id[1] : false;
  } catch {
    return false;
  }
};

// https://stackoverflow.com/questions/6903823/regex-for-youtube-id#answer-6904551
