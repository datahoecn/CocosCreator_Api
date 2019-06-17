

const macro = require('../platform/CCMacro');
const RenderComponent = require('./CCRenderComponent');
const renderEngine = require('../renderer/render-engine');
const RenderFlow = require('../renderer/render-flow');
const SpriteMaterial = renderEngine.SpriteMaterial;
const dynamicAtlasManager = require('../renderer/utils/dynamic-atlas/manager');
const LabelFrame = require('../renderer/utils/label/label-frame');

const HorizontalAlign = macro.TextAlignment;

const VerticalAlign = macro.VerticalTextAlignment;
const Overflow = cc.Enum({
    NONE: 0,
    CLAMP: 1,
    SHRINK: 2,
    RESIZE_HEIGHT: 3
});

const CacheMode = cc.Enum({
    NONE: 0,
    BITMAP: 1,
    CHAR: 2,
});

let Label = cc.Class({
    name: 'cc.Label',
    extends: RenderComponent,

    ctor () {
        if (CC_EDITOR) {
            this._userDefinedFont = null;
        }

        this._actualFontSize = 0;
        this._assemblerData = null;

        this._frame = null;
        this._ttfTexture = null;
        this._letterTexture = null;
    },

    editor: CC_EDITOR && {
        menu: 'i18n:MAIN_MENU.component.renderers/Label',
        help: 'i18n:COMPONENT.help_url.label',
        inspector: 'packages://inspector/inspectors/comps/label.js',
    },

    properties: {
        _useOriginalSize: true,
        
        /**
         * !#en Content string of label.
         * !#zh 标签显示的文本内容。
         * @property {String} string
         */
        _string: {
            default: '',
            formerlySerializedAs: '_N$string',
        },
        string: {
            get () {
                return this._string;
            },
            set (value) {
                let oldValue = this._string;
                this._string = value.toString();

                if (this.string !== oldValue) {
                    this._updateRenderData();
                }

                this._checkStringEmpty();
            },
            multiline: true,
            tooltip: CC_DEV && 'i18n:COMPONENT.label.string'
        },

        /**
         * !#en Horizontal Alignment of label.
         * !#zh 文本内容的水平对齐方式。
         * @property {Label.HorizontalAlign} horizontalAlign
         */
        horizontalAlign: {
            default: HorizontalAlign.LEFT,
            type: HorizontalAlign,
            tooltip: CC_DEV && 'i18n:COMPONENT.label.horizontal_align',
            notify  (oldValue) {
                if (this.horizontalAlign === oldValue) return;
                this._updateRenderData();
            },
            animatable: false
        },

        /**
         * !#en Vertical Alignment of label.
         * !#zh 文本内容的垂直对齐方式。
         * @property {Label.VerticalAlign} verticalAlign
         */
        verticalAlign: {
            default: VerticalAlign.TOP,
            type: VerticalAlign,
            tooltip: CC_DEV && 'i18n:COMPONENT.label.vertical_align',
            notify (oldValue) {
                if (this.verticalAlign === oldValue) return;
                this._updateRenderData();
            },
            animatable: false
        },


        /**
         * !#en The actual rendering font size in shrink mode
         * !#zh SHRINK 模式下面文本实际渲染的字体大小
         * @property {Number} actualFontSize
         */
        actualFontSize: {
            displayName: 'Actual Font Size',
            animatable: false,
            readonly: true,
            get () {
                return this._actualFontSize;
            }
        },

        _fontSize: 40,
        /**
         * !#en Font size of label.
         * !#zh 文本字体大小。
         * @property {Number} fontSize
         */
        fontSize: {
            get () {
                return this._fontSize;
            },
            set (value) {
                if (this._fontSize === value) return;

                this._fontSize = value;
                this._updateRenderData();
            },
            range: [0, 512],
            tooltip: CC_DEV && 'i18n:COMPONENT.label.font_size',
        },

        /**
         * !#en Font family of label, only take effect when useSystemFont property is true.
         * !#zh 文本字体名称, 只在 useSystemFont 属性为 true 的时候生效。
         * @property {String} fontFamily
         */
        fontFamily: {
            default: "Arial",
            tooltip: CC_DEV && 'i18n:COMPONENT.label.font_family',
            notify (oldValue) {
                if (this.fontFamily === oldValue) return;
                this._updateRenderData();
            },
            animatable: false
        },

        _lineHeight: 40,
        /**
         * !#en Line Height of label.
         * !#zh 文本行高。
         * @property {Number} lineHeight
         */
        lineHeight: {
            get () {
                return this._lineHeight;
            },
            set (value) {
                if (this._lineHeight === value) return;
                this._lineHeight = value;
                this._updateRenderData();
            },
            tooltip: CC_DEV && 'i18n:COMPONENT.label.line_height',
        },
        /**
         * !#en Overflow of label.
         * !#zh 文字显示超出范围时的处理方式。
         * @property {Label.Overflow} overflow
         */
        overflow: {
            default: Overflow.NONE,
            type: Overflow,
            tooltip: CC_DEV && 'i18n:COMPONENT.label.overflow',
            notify (oldValue) {
                if (this.overflow === oldValue) return;
                this._updateRenderData();
            },
            animatable: false
        },

        _enableWrapText: true,
        /**
         * !#en Whether auto wrap label when string width is large than label width.
         * !#zh 是否自动换行。
         * @property {Boolean} enableWrapText
         */
        enableWrapText: {
            get () {
                return this._enableWrapText;
            },
            set (value) {
                if (this._enableWrapText === value) return;

                this._enableWrapText = value;
                this._updateRenderData();
            },
            animatable: false,
            tooltip: CC_DEV && 'i18n:COMPONENT.label.wrap',
        },

        // 这个保存了旧项目的 file 数据
        _N$file: null,

        /**
         * !#en The font of label.
         * !#zh 文本字体。
         * @property {Font} font
         */
        font: {
            get () {
                return this._N$file;
            },
            set (value) {
                if (this.font === value) return;
                
                //if delete the font, we should change isSystemFontUsed to true
                if (!value) {
                    this._isSystemFontUsed = true;
                }

                if (CC_EDITOR && value) {
                    this._userDefinedFont = value;
                }

                this._N$file = value;
                if (value && this._isSystemFontUsed)
                    this._isSystemFontUsed = false;

                if ( typeof value === 'string' ) {
                    cc.warnID(4000);
                }

                if (this._renderData) {
                    this.destroyRenderData(this._renderData);
                    this._renderData = null;    
                }
                this._fontAtlas = null;
                this._updateAssembler();
                this._applyFontTexture(true);
                this._updateRenderData();
            },
            type: cc.Font,
            tooltip: CC_DEV && 'i18n:COMPONENT.label.font',
            animatable: false
        },

        _isSystemFontUsed: true,

        /**
         * !#en Whether use system font name or not.
         * !#zh 是否使用系统字体。
         * @property {Boolean} useSystemFont
         */
        useSystemFont: {
            get () {
                return this._isSystemFontUsed;
            },
            set (value) {
                if (this._isSystemFontUsed === value) return;
                
                this.destroyRenderData(this._renderData);
                this._renderData = null;

                if (CC_EDITOR) {
                    if (!value && this._isSystemFontUsed && this._userDefinedFont) {
                        this.font = this._userDefinedFont;
                        this.spacingX = this._spacingX;
                        return;
                    }
                }

                this._isSystemFontUsed = !!value;
                if (value) {
                    this.font = null;
                    this._updateAssembler();
                    this._updateRenderData();
                    this._checkStringEmpty();
                }
                else if (!this._userDefinedFont) {
                    this.disableRender();
                }

            },
            animatable: false,
            tooltip: CC_DEV && 'i18n:COMPONENT.label.system_font',
        },

        _bmFontOriginalSize: {
            displayName: 'BMFont Original Size',
            get () {
                if (this._N$file instanceof cc.BitmapFont) {
                    return this._N$file.fontSize;
                }
                else {
                    return -1;
                }
            },
            visible: true,
            animatable: false
        },

        _spacingX: 0,
        spacingX: {
            get () {
                return this._spacingX;
            },
            set (value) {
                this._spacingX = value;
                this._updateRenderData();
            }
        },

        //For compatibility with v2.0.x temporary reservation.
        _batchAsBitmap: false,

        /**
         * !#en The cache mode of label. This mode only supports system fonts.
         * !#zh 文本缓存模式, 该模式只支持系统字体。
         * @property {Label.CacheMode} cacheMode
         */
        cacheMode: {
            default: CacheMode.NONE,
            type: CacheMode,
            tooltip: CC_DEV && 'i18n:COMPONENT.label.cacheMode',
            notify (oldValue) {
                if (this.cacheMode === oldValue) return;
                
                if (oldValue === CacheMode.BITMAP && !(this.font instanceof cc.BitmapFont)) {
                    this._frame._resetDynamicAtlasFrame();
                }

                if (oldValue === CacheMode.CHAR) {
                    this._ttfTexture = null;
                }

                this._updateRenderData(true);
            },
            animatable: false
        },

        _isBold: {
            default: false,
            serializable: false,
        },
        _isItalic: {
            default: false,
            serializable: false,
        },
        _isUnderline: {
            default: false,
            serializable: false,
        },
    },

    statics: {
        HorizontalAlign: HorizontalAlign,
        VerticalAlign: VerticalAlign,
        Overflow: Overflow,
        CacheMode: CacheMode,
    },

    onLoad () {
        // For compatibility with v2.0.x temporary reservation.
        if (this._batchAsBitmap && this.cacheMode === CacheMode.NONE) {
            this.cacheMode = CacheMode.BITMAP;
            this._batchAsBitmap = false;
        }
    },

    onEnable () {
        this._super();

        // TODO: Hack for barbarians
        if (!this.font && !this._isSystemFontUsed) {
            this.useSystemFont = true;
        }
        // Reapply default font family if necessary
        if (this.useSystemFont && !this.fontFamily) {
            this.fontFamily = 'Arial';
        }

        // Keep track of Node size
        this.node.on(cc.Node.EventType.SIZE_CHANGED, this._updateRenderData, this);
        this.node.on(cc.Node.EventType.ANCHOR_CHANGED, this._updateRenderData, this);

        this._checkStringEmpty();
        this._updateRenderData(true);
    },

    onDisable () {
        this._super();
        this.node.off(cc.Node.EventType.SIZE_CHANGED, this._updateRenderData, this);
        this.node.off(cc.Node.EventType.ANCHOR_CHANGED, this._updateRenderData, this);
    },

    onDestroy () {
        this._assembler && this._assembler._resetAssemblerData && this._assembler._resetAssemblerData(this._assemblerData);
        this._assemblerData = null;
        this._letterTexture = null;
        if (this._ttfTexture) {
            this._ttfTexture.destroy();
            this._ttfTexture = null;
        }
        this._super();
    },
    
    _canRender () {
        let result = this._super();
        let font = this.font;
        if (font instanceof cc.BitmapFont) {
            let spriteFrame = font.spriteFrame;
            // cannot be activated if texture not loaded yet
            if (!spriteFrame || !spriteFrame.textureLoaded()) {
                result = false;
            }
        }
        return result;
    },

    _checkStringEmpty () {
        this.markForRender(!!this.string);
    },

    _updateAssembler () {
        let assembler = Label._assembler.getAssembler(this);

        if (this._assembler !== assembler) {
            this._assembler = assembler;
            this._renderData = null;
            this._frame = null;
        }

        if (!this._renderData) {
            this._renderData = this._assembler.createData(this);
        }
    },

    _applyFontTexture (force) {
        let font = this.font;
        if (font instanceof cc.BitmapFont) {
            let spriteFrame = font.spriteFrame;
            this._frame = spriteFrame;
            let self = this;
            let onBMFontTextureLoaded = function () {
                // TODO: old texture in material have been released by loader
                self._frame._texture = spriteFrame._texture;
                self._activateMaterial(force);
                if (force) {
                    self._assembler && self._assembler.updateRenderData(self);
                }
            };
            // cannot be activated if texture not loaded yet
            if (spriteFrame && spriteFrame.textureLoaded()) {
                onBMFontTextureLoaded();
            }
            else {
                this.disableRender();

                if (spriteFrame) {
                    spriteFrame.once('load', onBMFontTextureLoaded, this);
                    spriteFrame.ensureLoadTexture();
                }
            }
        }
        else {

            if (!this._frame) {
                this._frame = new LabelFrame();
            }
 
            if (this.cacheMode === CacheMode.CHAR && cc.sys.browserType !== cc.sys.BROWSER_TYPE_WECHAT_GAME_SUB) {
                this._letterTexture = this._assembler._getAssemblerData();
                this._frame._refreshTexture(this._letterTexture);
            } else if (!this._ttfTexture) {
                this._ttfTexture = new cc.Texture2D();
                this._assemblerData = this._assembler._getAssemblerData();
                this._ttfTexture.initWithElement(this._assemblerData.canvas);
            } 

            if (this.cacheMode !== CacheMode.CHAR) {
                this._frame._refreshTexture(this._ttfTexture);
            }
            
            this._activateMaterial(force);

            if (force) {
                this._assembler && this._assembler.updateRenderData(this);
            }
        }
    },

    _updateColor () {
        let font = this.font;
        if (font instanceof cc.BitmapFont) {
            this._super();
        }
        else {
            this._updateRenderData();
            this.node._renderFlag &= ~RenderFlow.FLAG_COLOR;
        }
    },

    _activateMaterial (force) {
        let material = this._material;
        if (material && !force) {
            return;
        }

        // Canvas
        if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
            this._frame._texture.url = this.uuid + '_texture';
        }
        // WebGL
        else {
            if (!material) {
                material = new SpriteMaterial();
            }
            material.texture = this._frame._texture;
            // For batch rendering, do not use uniform color.
            material.useColor = false;
            this._updateMaterial(material);
        }

        this.markForUpdateRenderData(true);
        this.markForRender(true);
    },

    _updateRenderData (force) {
        let renderData = this._renderData;
        if (renderData) {
            renderData.vertDirty = true;
            renderData.uvDirty = true;
            this.markForUpdateRenderData(true);
        }

        if (force) {
            this._updateAssembler();
            this._applyFontTexture(force);
        }
    },

    _calDynamicAtlas () {
        if (!dynamicAtlasManager) return;

        if (!this._frame._original) {
            let frame = dynamicAtlasManager.insertSpriteFrame(this._frame);
            if (frame) {
                this._frame._setDynamicAtlasFrame(frame);
            }
        }
        if (this._material._texture !== this._frame._texture) {
            this._activateMaterial(true);
        }
    },

    _enableBold (enabled) {
        this._isBold = !!enabled;
    },

    _enableItalics (enabled) {
        this._isItalic = !!enabled;
    },

    _enableUnderline (enabled) {
        this._isUnderline = !!enabled;
    },
 });

 cc.Label = module.exports = Label;
