class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) {
            throw new Error()
        }
        this.state = "normal";
        this.states = ["normal"];
        this.buffer = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (state !== "hungry" && state !== "busy" &&
            state !== "sleeping" && state !== "normal") {
            throw new Error()
        }

        this.state = state;
        this.states.push(this.state);
        return this.state
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        this.buffer = [];
        this.event = event;
        if (this.event === "study" &&
            this.states[this.states.length - 1] === "normal") {
            this.state = "busy";
            this.states.push(this.state);

        } else if (this.event === "get_tired" &&
            this.states[this.states.length - 1] === "busy") {
            this.state = "sleeping";
            this.states.push(this.state);

        } else if (this.event === "get_up" &&
            this.states[this.states.length - 1] === "sleeping") {
            this.state = "normal";
            this.states.push(this.state);

        } else if (this.event === "get_hungry" &&
            this.states[this.states.length - 1] === "busy") {
            this.state = "hungry";
            this.states.push(this.state);

        } else if (this.event === "get_hungry" &&
            this.states[this.states.length - 1] === "sleeping") {
            this.state = "hungry";
            this.states.push(this.state);

        } else if (this.event === "eat" &&
            this.states[this.states.length - 1] === "hungry") {
            this.state = "normal";
            this.states.push(this.state);

        } else if (event !== "eat" ||
            event !== "get_hungry" ||
            event !== "get_up" ||
            event !== "get_tired" ||
            event !== "study") {
            throw new Error()
        }

        return this.state
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        return this.state = "normal";
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        this.event = event;
        if (!event) {
            this.states = ['normal', 'busy', 'hungry', 'sleeping']
        } else if (event !== "eat"
            && event !== "get_hungry"
            && event !== "get_up"
            && event !== "get_tired"
            && event !== "study") {
            this.states = []
        } else if (event === "get_hungry") {
            this.states = ["busy", "sleeping"]
        } else if (event === "get_up") {
            this.states = ["sleeping"]
        } else if (event === "get_tired") {
            this.states = ["busy"]
        } else if (event === "study") {
            this.states = ["normal"]
        } else if (event === "eat") {
            this.states = ["hungry"]
        }

        return this.states
    }

    /*
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        let result;
        if (this.states.length < 2 || this.state === "normal") {
            result = false
        } else if (this.states.length >= 2) {
            this.buffer.push(this.states.pop());
            this.changeState(this.states[this.states.length - 1]);
            result = true;
        }

        return result
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        let result;
        if (this.states.length < 2 && this.state === "normal") {
            result = false
        } else if (this.states.length >= 2 && this.buffer.length !== 0) {
            this.changeState(this.buffer[this.buffer.length - 1]);
            result = true;
            this.buffer.pop();
        } else if (this.buffer.length === 0) {
            result = false
        }


        return result
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        return this.states = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
