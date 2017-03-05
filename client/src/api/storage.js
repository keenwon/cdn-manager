/**
 * Types
 */
const types = {
  history: 'KEY_HISTORY',
  collection: 'KEY_COLLECTION'
};

/**
 * 获取History
 */
export const getHistory = () => {
  return _get(types.history);
};

/**
 * 获取Collection
 */
export const getCollection = () => {
  return _get(types.collection);
};

/**
 * 添加History
 *
 * 如果存在collectionName，每项存储为{collectionName, url}
 * 否则存储为 {url}
 */
export const pushHistory = (urls, collectionName = '') => {
  return _push(types.history, urls.map(url => ({
    url,
    collectionName
  })));
};

/**
 * 添加Collection
 */
export const pushCollection = collections => {
  return _push(types.collection, collections);
};

/**
 * 删除History
 */
export const removeHistory = id => {
  return _remove(types.history, id);
};

/**
 * 删除Collection
 */
export const removeCollection = id => {
  return _remove(types.collection, id);
};

/**
 * 清楚指定key的localStorage
 */
export function removeAll(type) {
  let key = types[type];

  if (!key) {
    return false;
  }

  localStorage.removeItem(key);
  return true;
}

/**
 * 获取存储状态
 */
export const getStorageState = () => {
  let totle = 0;
  let state = {};
  let type, key, keyLen;

  for (type in types) {
    if (!types.hasOwnProperty(type)) {
      continue;
    }

    key = types[type];

    if (!localStorage[key]) {
      continue;
    }

    // the char in javascript stores as UTF-16 (occupies 2 bytes)
    keyLen = (localStorage[key].length + key.length) * 2;

    totle += keyLen;

    state[type] = _formatSize(keyLen);
  }

  state['total'] = _formatSize(totle);

  return state;
};

/**
 * 从localstorage中获取指定key的值
 */
function _get(key) {
  return JSON.parse(localStorage.getItem(key));
}

/**
 * 向localStorage存储的数组中push数据
 */
function _push(key, array) {
  if (!key || !array) {
    return false;
  }

  let oldValue;
  let rawValue = localStorage.getItem(key);

  if (rawValue) {
    try {
      oldValue = JSON.parse(rawValue);
    } catch (e) {
      // do nothing
    }
  } else {
    oldValue = [];
  }

  if (!Array.isArray(oldValue)) {
    return false;
  }

  let newArray = oldValue.concat(formatList(array));

  localStorage.setItem(key, JSON.stringify(newArray));

  return newArray;
}

/**
 * 从localStorage存储的数组中remove数据
 */
function _remove(key, id) {
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

  return newValue;
}

/**
 * 格式化size
 */
function _formatSize(size) {
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
}

/**
 * 格式化为存储使用的list
 */
function formatList(list) {
  return list.map(item => ({
    id: getId(),
    value: item,
    timestamp: Date.now()
  }));
}

/**
 * 获取唯一的ID
 */
function getId() {
  return Math.random().toString().substr(2);
}