export const getToastOptions = (theme) => ({
  style: {
    background: theme === 'dark' ? '#1a1b1f' : '',
    color: theme === 'dark' ? '#fff' : ''
  },
  className: '!border-l-2 !rounded !border-indigo-500 overflow-hidden',
  success: {
    className: '!border-l-2 !rounded !border-green-500 overflow-hidden',
    iconTheme: {
      primary: '#10B981',
      secondary: 'white'
    }
  },
  error: {
    className: '!border-l-2 !rounded !border-red-500 overflow-hidden',
    iconTheme: {
      primary: '#EF4444',
      secondary: 'white'
    }
  },
  loading: {
    className: '!border-l-2 !rounded !border-yellow-500 overflow-hidden'
  },
  duration: 4000
})

export const withCSR = (next) => async (ctx) => {
    const isCSR = ctx.req.url?.startsWith('/_next');
    if (isCSR) {
        return {
            props: {},
        };
    }
    return next?.(ctx)
}

export const getSecondsFromTime = (time) => {
  const timeSplitted = time.split(':')
  let seconds = 0
  let minute = 1
  while (timeSplitted.length > 0) {
    seconds += minute * parseInt(timeSplitted.pop() ?? '0', 10)
    minute *= 60
  }
  return seconds
}

export const getTimeFromSeconds = (seconds) => {
  if (seconds === 'Infinity') return null
  const parsed = parseFloat(seconds)
  if (parsed < 3600) {
    return new Date(parsed * 1000)?.toISOString().slice(14, 19)
  }
  return new Date(parsed * 1000)?.toISOString().slice(11, 19)
}

export function nFormatter(num, digits) {
  const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item) {
      return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

export const dateFormat = (p_timeStampNanoSeconds) => {
  const milliseconds = p_timeStampNanoSeconds / 1000000;
  const date = new Date(milliseconds);
  //return new Date(milliseconds).toLocaleString('en-US');
  // const formattedDate = new Date(milliseconds).toLocaleString('en-US', {
  //     year: 'numeric',
  //     month: 'short',
  //     day: 'numeric',
  //     hour: 'numeric',
  //     minute: 'numeric',
  //     second: 'numeric',
  //     hour12: true
  // });
  const formattedDate = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',

  }) + ' · ' + date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
  });
  return formattedDate;
}

export const timeNow = (p_timeStampNanoSeconds) => {
  const milliseconds = p_timeStampNanoSeconds / 1000000;
  const durationUntilNowInMilliseconds = new Date().getTime() - milliseconds;
  const durationInMinutes = durationUntilNowInMilliseconds / 1000 / 60;

  if (durationInMinutes < 60) {
      return (durationInMinutes > 1) ? Math.floor(durationInMinutes) + ' minutes ago' : Math.floor(durationInMinutes) + ' minute ago';
  }

  const durationInHours = durationInMinutes / 60;

  if (durationInHours < 24) {
      return (durationInHours > 1) ? Math.floor(durationInHours) + ' hours ago' : Math.floor(durationInHours) + ' hour ago';
  }

  const durationInDays = durationInHours / 24;

  return (durationInDays > 1) ? Math.floor(durationInDays) + ' days ago' : Math.floor(durationInDays) + ' day ago';
}

export const isAlreadyAddedToWatchLater = (currentVideo,videos) => {
  const alreadyExists = videos.find((el) => el.PostHashHex === currentVideo.PostHashHex)
  return !!alreadyExists
}

export const getThumbDuration = (duration) => {
  const seconds = Math.round(duration)
  const second = (duration > 10) ? 10 : (duration > 5) ? 5 : (duration > 1) ? 1 : 0
 return `${second}s`
}