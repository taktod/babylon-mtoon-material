import { SmartArray } from '@babylonjs/core/Misc/smartArray';
import type { IAnimatable } from '@babylonjs/core/Animations/animatable.interface';
import type { Nullable } from '@babylonjs/core/types';
import { Scene } from '@babylonjs/core/scene';
import { Matrix } from '@babylonjs/core/Maths/math.vector';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import type { SubMesh } from '@babylonjs/core/Meshes/subMesh';
import type { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import type { Mesh } from '@babylonjs/core/Meshes/mesh';
import { ImageProcessingConfiguration } from '@babylonjs/core/Materials/imageProcessingConfiguration';
import type { ColorCurves } from '@babylonjs/core/Materials/colorCurves';
import { PushMaterial } from '@babylonjs/core/Materials/pushMaterial';
import type { BaseTexture } from '@babylonjs/core/Materials/Textures/baseTexture';
import type { RenderTargetTexture } from '@babylonjs/core/Materials/Textures/renderTargetTexture';
import { DetailMapConfiguration } from '@babylonjs/core/Materials/material.detailMapConfiguration';
/**
 * Debug shading mode
 */
export declare enum DebugMode {
    None = 0,
    Normal = 1,
    LitShadeRate = 2
}
/**
 * Outline color mode
 */
export declare enum OutlineColorMode {
    FixedColor = 0,
    MixedLighting = 1
}
/**
 * Outline width mode
 */
export declare enum OutlineWidthMode {
    None = 0,
    WorldCorrdinates = 1,
    ScreenCoordinates = 2
}
/**
 * Cull mode
 */
export declare enum CullMode {
    Off = 0,
    Front = 1,
    Back = 2
}
/**
 * MToon は日本のアニメ的表現をすることを目標としています。
 * 主色 (Lit Color) と陰色 (Shade Color) の 2 色を、Lighting パラメータや光源環境に応じて混合することでそれを実現します。
 * VRM での出力パラメータとプロパティのマッピングは下記となります。
 *
 * MToon aims for making Japanese anime expressions.
 * It is achieved by mixing Lit Color and Shade Color based on Lighting parameters and light source environment.
 *
 * @see https://github.com/Santarh/MToon/
 * @see https://vrm.dev/univrm/shaders/mtoon/
 * @see https://doc.babylonjs.com/babylon101/materials
 */
export declare class MToonMaterial extends PushMaterial {
    private _diffuseTexture;
    /**
     * The basic texture of the material as viewed under a light.
     */
    diffuseTexture: Nullable<BaseTexture>;
    private _emissiveTexture;
    /**
     * Define texture of the material as if self lit.
     * This will be mixed in the final result even in the absence of light.
     */
    emissiveTexture: Nullable<BaseTexture>;
    private _bumpTexture;
    /**
     * Bump mapping is a technique to simulate bump and dents on a rendered surface.
     * These are made by creating a normal map from an image. The means to do this can be found on the web, a search for 'normal map generator' will bring up free and paid for methods of doing this.
     * @see https://doc.babylonjs.com/how_to/more_materials#bump-map
     */
    bumpTexture: Nullable<BaseTexture>;
    private _shadeTexture;
    /**
     * The basic texture of the material as viewed does not receive a light
     */
    shadeTexture: Nullable<BaseTexture>;
    private _receiveShadowTexture;
    /**
     * Receiving shadow rate with texture
     * receiveShadowRate * texture.a
     */
    receiveShadowTexture: Nullable<BaseTexture>;
    private _shadingGradeTexture;
    /**
     * Shading grade rate
     * shadingGradeRate * (1.0 - texture.r))
     */
    shadingGradeTexture: Nullable<BaseTexture>;
    private _rimTexture;
    /**
     * Parametric Rim Lighting
     */
    rimTexture: Nullable<BaseTexture>;
    private _matCapTexture;
    /**
     * MatCap Lighting
     */
    matCapTexture: Nullable<BaseTexture>;
    private _outlineWidthTexture;
    /**
     * Adjust outline width
     */
    outlineWidthTexture: Nullable<BaseTexture>;
    private _uvAnimationMaskTexture;
    /**
     * UV animation mask
     */
    uvAnimationMaskTexture: Nullable<BaseTexture>;
    /**
     * the list of textures
     *
     * @returns {Array<Nullable<BaseTexture>>}
     */
    private get appendedTextures();
    /**
     * the list of active textures
     *
     * @returns {BaseTexture[]}
     */
    private get appendedActiveTextures();
    /**
     * Multiplier of diffuseTexture
     */
    diffuseColor: Color3;
    /**
     * babylon.js Ambient light
     */
    ambientColor: Color3;
    /**
     * Emissive color
     */
    emissiveColor: Color3;
    /**
     * Multiplier of shadeTexture
     */
    shadeColor: Color3;
    /**
     * Rim color
     */
    rimColor: Color3;
    /**
     * Outline color
     */
    outlineColor: Color3;
    /**
     * If true, the emissive value is added into the end result, otherwise it is multiplied in.
     */
    readonly useEmissiveAsIllumination = false;
    /**
     * If true, some kind of energy conservation will prevent the end result to be more than 1 by reducing
     * the emissive level when the final color is close to one.
     */
    readonly linkEmissiveWithDiffuse = false;
    /**
     * Specifies that the material will keeps the reflection highlights over a transparent surface (only the most luminous ones).
     * A car glass is a good exemple of that. When the street lights reflects on it you can not see what is behind.
     */
    readonly useReflectionOverAlpha = false;
    private _disableLighting;
    /**
     * Does lights from the scene impacts this material.
     * It can be a nice trick for performance to disable lighting on a fully emissive material.
     */
    disableLighting: boolean;
    /**
     * Allows using an object space normal map (instead of tangent space).
     * No support
     */
    readonly useObjectSpaceNormalMap: boolean;
    /**
     * Is parallax enabled or not.
     * @see https://doc.babylonjs.com/how_to/using_parallax_mapping
     * No support
     */
    readonly useParallax: boolean;
    /**
     * Is parallax occlusion enabled or not.
     * If true, the outcome is way more realistic than traditional Parallax but you can expect a performance hit that worthes consideration.
     * @see https://doc.babylonjs.com/how_to/using_parallax_mapping
     * No support
     */
    readonly useParallaxOcclusion: boolean;
    /**
     * No support for specular
     */
    readonly specularSupported: boolean;
    /**
     * In case of light mapping, define whether the map contains light or shadow informations.
     * No support
     */
    readonly useLightmapAsShadowmap: boolean;
    /**
     * No support for vertex colors
     */
    readonly useVertexColor: boolean;
    /**
     * Support for bones in shader
     */
    readonly useBones: boolean;
    /**
     * Support for morph targets in shader
     */
    readonly useMorphTargets: boolean;
    /**
     * No support for vertex alpha
     */
    readonly useVertexAlpha: boolean;
    /**
     * No support for baked vertex animation
     */
    readonly useBakedVertexAnimation: boolean;
    /**
     * Defines the alpha limits in alpha test mode.
     */
    alphaCutOff: number;
    private _useAlphaFromDiffuseTexture;
    /**
     * Does the transparency come from the diffuse texture alpha channel.
     */
    useAlphaFromDiffuseTexture: boolean;
    private _maxSimultaneousLights;
    /**
     * Defines the maximum number of lights that can be used in the material
     */
    maxSimultaneousLights: number;
    /**
     * inverted state equals with Unity
     */
    private _invertNormalMapX;
    /**
     * If sets to true, x component of normal map value will invert (x = 1.0 - x).
     */
    invertNormalMapX: boolean;
    /**
     * inverted state equals with Unity
     */
    private _invertNormalMapY;
    /**
     * If sets to true, y component of normal map value will invert (y = 1.0 - y).
     */
    invertNormalMapY: boolean;
    private _twoSidedLighting;
    /**
     * If sets to true and backfaceCulling is false, normals will be flipped on the backside.
     */
    twoSidedLighting: boolean;
    /**
     * Default configuration related to image processing available in the standard Material.
     */
    protected _imageProcessingConfiguration: ImageProcessingConfiguration;
    /**
     * Gets the image processing configuration used either in this material.
     */
    get imageProcessingConfiguration(): ImageProcessingConfiguration;
    /**
     * Sets the Default image processing configuration used either in the this material.
     *
     * If sets to null, the scene one is in use.
     */
    set imageProcessingConfiguration(value: ImageProcessingConfiguration);
    /**
     * Keep track of the image processing observer to allow dispose and replace.
     */
    private _imageProcessingObserver;
    /**
     * Attaches a new image processing configuration to the Standard Material.
     * @param configuration
     */
    protected _attachImageProcessingConfiguration(configuration: Nullable<ImageProcessingConfiguration>): void;
    /**
     * Can this material render to prepass
     * No support for PrePass
     */
    get isPrePassCapable(): boolean;
    /**
     * Gets whether the color curves effect is enabled.
     */
    get cameraColorCurvesEnabled(): boolean;
    /**
     * Sets whether the color curves effect is enabled.
     */
    set cameraColorCurvesEnabled(value: boolean);
    /**
     * Gets whether the color grading effect is enabled.
     */
    get cameraColorGradingEnabled(): boolean;
    /**
     * Gets whether the color grading effect is enabled.
     */
    set cameraColorGradingEnabled(value: boolean);
    /**
     * Gets whether tonemapping is enabled or not.
     */
    get cameraToneMappingEnabled(): boolean;
    /**
     * Sets whether tonemapping is enabled or not
     */
    set cameraToneMappingEnabled(value: boolean);
    /**
     * The camera exposure used on this material.
     * This property is here and not in the camera to allow controlling exposure without full screen post process.
     * This corresponds to a photographic exposure.
     */
    get cameraExposure(): number;
    /**
     * The camera exposure used on this material.
     * This property is here and not in the camera to allow controlling exposure without full screen post process.
     * This corresponds to a photographic exposure.
     */
    set cameraExposure(value: number);
    /**
     * Gets The camera contrast used on this material.
     */
    get cameraContrast(): number;
    /**
     * Sets The camera contrast used on this material.
     */
    set cameraContrast(value: number);
    /**
     * Gets the Color Grading 2D Lookup Texture.
     */
    get cameraColorGradingTexture(): Nullable<BaseTexture>;
    /**
     * Sets the Color Grading 2D Lookup Texture.
     */
    set cameraColorGradingTexture(value: Nullable<BaseTexture>);
    /**
     * The color grading curves provide additional color adjustmnent that is applied after any color grading transform (3D LUT).
     * They allow basic adjustment of saturation and small exposure adjustments, along with color filter tinting to provide white balance adjustment or more stylistic effects.
     * These are similar to controls found in many professional imaging or colorist software. The global controls are applied to the entire image. For advanced tuning, extra controls are provided to adjust the shadow, midtone and highlight areas of the image;
     * corresponding to low luminance, medium luminance, and high luminance areas respectively.
     */
    get cameraColorCurves(): Nullable<ColorCurves>;
    /**
     * The color grading curves provide additional color adjustment that is applied after any color grading transform (3D LUT).
     * They allow basic adjustment of saturation and small exposure adjustments, along with color filter tinting to provide white balance adjustment or more stylistic effects.
     * These are similar to controls found in many professional imaging or colorist software. The global controls are applied to the entire image. For advanced tuning, extra controls are provided to adjust the shadow, midtone and highlight areas of the image;
     * corresponding to low luminance, medium luminance, and high luminance areas respectively.
     */
    set cameraColorCurves(value: Nullable<ColorCurves>);
    /**
     * Can this material render to several textures at once
     */
    get canRenderToMRT(): boolean;
    /**
     * Defines the detail map parameters for the material.
     */
    readonly detailMap: DetailMapConfiguration;
    protected _renderTargets: SmartArray<RenderTargetTexture>;
    protected _worldViewProjectionMatrix: Matrix;
    protected _globalAmbientColor: Color3;
    protected _useLogarithmicDepth: boolean;
    protected _cacheHasRenderTargetTextures: boolean;
    private _bumpScale;
    get bumpScale(): number;
    set bumpScale(value: number);
    private _receiveShadowRate;
    get receiveShadowRate(): number;
    set receiveShadowRate(value: number);
    private _shadingGradeRate;
    get shadingGradeRate(): number;
    set shadingGradeRate(value: number);
    private _shadeShift;
    get shadeShift(): number;
    set shadeShift(value: number);
    private _shadeToony;
    get shadeToony(): number;
    set shadeToony(value: number);
    private _lightColorAttenuation;
    get lightColorAttenuation(): number;
    set lightColorAttenuation(value: number);
    private _indirectLightIntensity;
    get indirectLightIntensity(): number;
    set indirectLightIntensity(value: number);
    private _rimLightingMix;
    get rimLightingMix(): number;
    set rimLightingMix(value: number);
    private _rimFresnelPower;
    get rimFresnelPower(): number;
    set rimFresnelPower(value: number);
    private _rimLift;
    get rimLift(): number;
    set rimLift(value: number);
    private _outlineWidth;
    get outlineWidth(): number;
    set outlineWidth(value: number);
    private _outlineScaledMaxDistance;
    get outlineScaledMaxDistance(): number;
    set outlineScaledMaxDistance(value: number);
    private _outlineLightingMix;
    get outlineLightingMix(): number;
    set outlineLightingMix(value: number);
    private _uvAnimationScrollX;
    get uvAnimationScrollX(): number;
    set uvAnimationScrollX(value: number);
    private _uvAnimationScrollY;
    get uvAnimationScrollY(): number;
    set uvAnimationScrollY(value: number);
    private _uvAnimationRotation;
    get uvAnimationRotation(): number;
    set uvAnimationRotation(value: number);
    private _alphaTest;
    get alphaTest(): boolean;
    set alphaTest(value: boolean);
    private _alphaBlend;
    get alphaBlend(): boolean;
    set alphaBlend(value: boolean);
    private _debugMode;
    /** @hidden */
    debugMode: DebugMode;
    private outlineRenderer?;
    private _outlineWidthMode;
    get outlineWidthMode(): OutlineWidthMode;
    set outlineWidthMode(value: OutlineWidthMode);
    private isOutline;
    enableOutlineRender(): void;
    disaableOutlineRender(): void;
    outlineColorMode: OutlineColorMode;
    private _cullMode;
    get cullMode(): CullMode;
    set cullMode(value: CullMode);
    private _outlineCullMode;
    outlineCullMode: CullMode;
    private storedCullMode;
    /**
     * アウトライン用 CullMode を設定
     * @hidden
     */
    applyOutlineCullMode(): void;
    /**
     * CullMode をリストア
     * @hidden
     */
    restoreOutlineCullMode(): void;
    /**
     * @hidden
     */
    getOutlineRendererName(): string;
    /**
     * flip mainUv.x if true
     */
    flipU: boolean;
    /**
     * flip mainUv.y if true
     */
    flipV: boolean;
    /**
     * {@inheritdoc}
     */
    constructor(name: string, scene?: Scene);
    /**
     * Gets a boolean indicating that current material needs to register RTT
     */
    get hasRenderTargetTextures(): boolean;
    /**
     * {@inheritdoc}
     */
    getClassName(): string;
    /**
     * In case the depth buffer does not allow enough depth precision for your scene (might be the case in large scenes)
     * You can try switching to logarithmic depth.
     * @see https://doc.babylonjs.com/how_to/using_logarithmic_depth_buffer
     */
    get useLogarithmicDepth(): boolean;
    set useLogarithmicDepth(value: boolean);
    /**
     * {@inheritdoc}
     */
    needAlphaBlending(): boolean;
    /**
     * {@inheritdoc}
     */
    needAlphaTesting(): boolean;
    /**
     * {@inheritdoc}
     */
    protected _shouldUseAlphaFromDiffuseTexture(): boolean;
    /**
     * {@inheritdoc}
     */
    protected _hasAlphaChannel(): boolean;
    /**
     * {@inheritdoc}
     */
    getAlphaTestTexture(): Nullable<BaseTexture>;
    /**
     * {@inheritdoc}
     */
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
    /**
     * Determine the layout of the UniformBufferObject
     * Must be added in the same order as the `uniform Material` in the shader
     * UBOs can be used to efficiently pass variables to shaders, but only WebGL v2 is supported.
     * babylon.js automatically falls back on WebGL v1
     * The second argument is the number of floats
     */
    buildUniformLayout(): void;
    /**
     * {@inheritdoc}
     * Binds current shader variables
     * This method is called every frame, so even if it is redundant, it prefers speed.
     */
    bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
    /**
     * {@inheritdoc}
     */
    getAnimatables(): IAnimatable[];
    /**
     * {@inheritdoc}
     */
    getActiveTextures(): BaseTexture[];
    /**
     * {@inheritdoc}
     */
    hasTexture(texture: BaseTexture): boolean;
    /**
     * {@inheritdoc}
     */
    dispose(forceDisposeEffect?: boolean, forceDisposeTextures?: boolean): void;
    /**
     * {@inheritdoc}
     */
    clone(name: string): MToonMaterial;
    /**
     * {@inheritdoc}
     */
    static Parse(source: any, scene: Scene, rootUrl: string): MToonMaterial;
    /**
     * 独自メソッド: テクスチャ情報をバインドする
     * @param texture
     * @param effect
     * @param name
     * @param infoName
     */
    private bindTexture;
    /**
     * 独自メソッド: テクスチャの用意が終わっているか確認する
     * @param texture
     * @param defines
     * @param key
     */
    private isReadyForTexture;
    /**
     * 独自メソッド: 定数を設定する
     */
    private applyDefines;
}
