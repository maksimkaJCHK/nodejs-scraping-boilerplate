const typesDoc = [
  {
    type: 'csv',
    mimeType: 'text/csv',
  },
  {
    type: 'doc',
    mimeType: 'application/msword',
  },
  {
    type: 'docx',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  },
  {
    type: 'jpeg',
    mimeType: 'image/jpeg',
  },
  {
    type: 'png',
    mimeType: 'image/png',
  },
  {
    type: 'json',
    mimeType: 'application/json',
  },
  {
    type: 'mp3',
    mimeType: 'audio/mpeg',
  },
  {
    type: 'mp4',
    mimeType: 'video/mp4',
  },
  {
    type: 'odt',
    mimeType: 'application/vnd.oasis.opendocument.text',
  },
  {
    type: 'oga',
    mimeType: 'audio/ogg',
  },
  {
    type: 'pdf',
    mimeType: 'application/pdf',
  },
  {
    type: 'rtf',
    mimeType: 'application/rtf',
  },
  {
    type: 'tiff',
    mimeType: 'image/tiff',
  },
  {
    type: 'txt',
    mimeType: 'text/plain',
  },
  {
    type: 'wav',
    mimeType: 'audio/wav',
  },
  {
    type: 'weba',
    mimeType: 'audio/webm',
  },
  {
    type: 'webp',
    mimeType: 'image/webp',
  },
  {
    type: 'xls',
    mimeType: 'application/vnd.ms-excel',
  },
  {
    type: 'xlsx',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
];

const bType = (mType) => {
  const fIdx = typesDoc.findIndex((el) => el.mimeType == mType);

  if (fIdx !== -1) {
    return typesDoc[fIdx].type;
  }

  return null;
};

exports.bType = bType;