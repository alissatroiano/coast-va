
/**
 * A class for simplyfing webcomponent creation. 
 * Handles much of the boiler plate and component creation code.
 */
export class WebComponent extends HTMLElement {
    /* Type properties and methods */
    static template = null;

    /**
     * Provides the attributes and their types this component recognises.
     * @static
     * eg:
     * {'attribute1': {type:Number,default:0}}
     */
    static get attributes() { return null; }
    
    /**
     * Provides the DOM tag name for this component
     * @static
     * @abstract
     * @return {String} - tag name
     */
    static get tagName() {
        throw new Error('Component has no defined tag name! Have you provided a static get tagName method?');
    }

    /**
     * API Use
     */
    static get observedAttributes() {
        if (!this.attributes) return [];
        return Object.keys(this.attributes);
    }

    /**
     * Creates the default accessor for this component for the property and attribute passed.
     * Allows redefining of default accessor for derived classes, internal use only.
     * @protected
     * @param {Object} self - Web Component instance (this)
     * @param {String} attr - attribute name
     *      * @param {String} prop - property name
     * @returns 
     */
    static _createDefaultAccessor(self, attr, prop) {
        Object.defineProperty(self, attr, {
            get() { return self[prop]; },
            set(val) {
                self[prop] = self.attributes[attr].type(val);
                self.setAttribute(attr, val);
            }
        });
    }

    /* Instance Properties and methods */
    constructor() {
        super();
        // If this component has custom attributes
        if (this.attributes) {
            for (const [key, value] of Object.entries(this.attributes)) {
                const propName = `_${key}`;
                // Create a property and set it to the default value
                this[propName] = value.default;
    
                // If getters and setters don't already exist, add them
                if (!(key in this)) {
                    this.constructor._createDefaultAccessor(this, key, propName);
                }
            }
        }
    }

    /**
     * Creates and appends a shadow dom to the component with the properties passed.
     * Intended only for use by derived classes.
     * @protected
     * @param {Object} properties - Shadow DOM properties
     * @returns {Element} - Created shadow DOM
     */
    _createShadow(properties) {
        const shadow = this.attachShadow(properties);
        shadow.append(this.template.content.cloneNode(true));
        return shadow;
    }

    /**
     * Provides this WebComponent's attached template element
     */
    get template() { return this.constructor.template; }

    /**
     * Provides this WebComponent's observed attributes
     */
    get attributes() { return this.constructor.attributes; }

    /**
     * API use
     */
    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) return;
        // Attributes are always strings, so decode it to the correct datatype
        const val = this.attributes[property].type(newValue);
        if (this[property] != val) this[property] = val;
    }
};


/**
 * Loads a given template file and creates a DOM template object
 * @param {String} file - url File path for the template
 * @returns 
 */
export const loadTemplate = file => {
    return new Promise((resolve, reject) => 
        fetch(file)
            .then(response => response.text())
            .then(data => {
                const templateEl = document.createElement('template');
                templateEl.innerHTML = data;
                resolve(templateEl);
            })
            .catch(reject)
    );
};


/**
 * Creates a template element from the HTML and optional CSS strings passed.
 * @param {String} html - String of HTML nodes for the template
 * @param {String} styles - (optional) String of styles for the template
 * @returns {Element} - Template element
 */
export const createTemplate = (html, styles = null) => {
    const templateEl = document.createElement('template');
    
    if (styles) {
        html = `<style>${styles}</style>${html}`;
    }
    templateEl.innerHTML = html;

    return templateEl;
};

/**
 * Creates a component from a WebComponent class implementation and template element
 * @param {Object} component - WebComponent class implementation
 * @param {Element} template - Template
 */
export const createComponent = (component, template = null) => {
    component.template = template;
    customElements.define(component.tagName, component);
};