/**
 * Types
 */
const types = {
  history: 'KEY_HISTORY',
  collection: 'KEY_COLLECTION'
};

export const pushHistory = urls => {
  return _push(types.history, urls);
};

// export const pushCollection = collections => {
// };

export const removeHistory = id => {
  return _remove(types.history, id);
};

// export const removeCollection = id => {
// };

export const removeAllHistory = () => {
  return _removeAll(types.history);
};

export const removeAllCollection = () => {
  return _removeAll(types.collection);
};

const _push = (key, array) => {
  if (!key || !array) {
    return false;
  }

  let oldValue;

  try {
    oldValue = JSON.parse(localStorage.getItem(key));
  } catch (e) {
    // do nothing
  }

  if (!Array.isArray(oldValue)) {
    return false;
  }

  let newArray = oldValue.concat(array);

  localStorage.setItem(key, JSON.stringify(newArray));
  return true;
};

const _remove = (key, id) => {
  let oldValue;

  try {
    oldValue = JSON.parse(localStorage.getItem(key));
  } catch (e) {
    // do nothing
  }

  if (!Array.isArray(oldValue)) {
    return false;
  }

  let newValue = oldValue.filter(item => item.id !== id);

  localStorage.setItem(key, JSON.stringify(newValue));

  return true;
};

const _removeAll = (key) => {
  localStorage.removeItem(key);
  return true;
};

/**
 * 格式化
 */
const _formatSize = size => {
  if (!size) {
    return '';
  }

  if (size < 1024) {
    return `${size} B`;
  } else if (size >= 1024 && size < 1024 * 1014) {
    return `${(size / 1024).toFixed(3)} KB`;
  } else {
    return `${(size / (1024 * 1024)).toFixed(3)} MB`;
  }
};

/**
 * 获取存储状态
 */
export const getStorageState = () => {
  let totle = 0;
  let state = [];
  let key, keyLen;

  for (key in localStorage) {
    if (!localStorage.hasOwnProperty(key)) {
      continue;
    }

    // the char in javascript stores as UTF-16 (occupies 2 bytes)
    keyLen = (localStorage[key].length + key.length) * 2;

    totle += keyLen;

    state[key] = _formatSize(keyLen);
  }

  state['total'] = _formatSize(totle);

  return state;
};
