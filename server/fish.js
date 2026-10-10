//copilot made me a fish

class Fish {
	constructor({ status = 'none', size = 0, location = 'none' } = {}) {
		this._status = status
		this._size = size
		this._location = typeof location === 'string' ? location : 'none'
	}

	// Updaters
	updateStatus(status) {
		this._status = status
		return this
	}

	updateSize(size) {
		this._size = size
		return this
	}

	updateLocation(location) {
		this._location = location
		return this
	}

	// Generic updater for convenience
	update({ status, size, location } = {}) {
		if (status !== undefined) this._status = status
		if (size !== undefined) this._size = size
		if (location !== undefined) this._location = location
		return this
	}

	// Getters
	getStatus() {
		return this._status
	}

	getSize() {
		return this._size
	}

	getLocation() {
		return this._location
	}

	// Return a plain object representation
	toObject() {
		return {
			status: this._status,
			size: this._size,
			location: this._location
		}
	}
}

module.exports = Fish
