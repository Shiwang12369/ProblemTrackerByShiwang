
class StorageService {
  constructor(storageType = 'local') {
    this.storage = storageType === 'session' ? sessionStorage : localStorage
  }

  /**
   * Save item to storage (JSON serialized)
   * @param {string} key - Storage key
   * @param {*} value - Value to store (object/array/string/number/boolean)
   * @returns {boolean} Success status
   */
  setItem(key, value) {
    try {
      const serializableValue = value === null || value === undefined ? null : value
      this.storage.setItem(key, JSON.stringify(serializableValue))
      return true
    } catch (error) {
      console.warn(`StorageService.setItem failed for key "${key}":`, error)
      return false
    }
  }

  /**
   * Get item from storage (JSON parsed)
   * @param {string} key - Storage key
   * @returns {*} Parsed value or null
   */
  getItem(key) {
    try {
      const item = this.storage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.warn(`StorageService.getItem failed for key "${key}":`, error)
      return null
    }
  }

  /**
   * Remove item from storage
   * @param {string} key - Storage key
   * @returns {boolean} Success status
   */
  removeItem(key) {
    try {
      this.storage.removeItem(key)
      return true
    } catch (error) {
      console.warn(`StorageService.removeItem failed for key "${key}":`, error)
      return false
    }
  }

  /**
   * Clear all storage
   * @returns {boolean} Success status
   */
  clear() {
    try {
      this.storage.clear()
      return true
    } catch (error) {
      console.warn('StorageService.clear failed:', error)
      return false
    }
  }

  /**
   * Check if key exists
   * @param {string} key - Storage key
   * @returns {boolean}
   */
  hasItem(key) {
    return this.storage.getItem(key) !== null
  }

  /**
   * Get all keys
   * @returns {string[]}
   */
  getAllKeys() {
    try {
      return Object.keys(this.storage)
    } catch (error) {
      console.warn('StorageService.getAllKeys failed:', error)
      return []
    }
  }
}

// Default instance (localStorage)
const storageService = new StorageService('local')

// Export default + named exports
export default storageService
export { StorageService }
