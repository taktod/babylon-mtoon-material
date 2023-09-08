import type { Scene } from '@babylonjs/core/scene';
import type { ISceneComponent } from '@babylonjs/core/sceneComponent';
import type { MToonMaterial } from './mtoon-material';
/**
 * MToon outline renderer
 * @see OutlineRenderer
 */
export declare class MToonOutlineRenderer implements ISceneComponent {
    readonly scene: Scene;
    readonly material: MToonMaterial;
    static rendererId: number;
    /**
     * @inheritdoc
     */
    readonly name: string;
    private _engine;
    private _passIdForDrawWrapper;
    /**
     * @inheritdoc
     * MToonMaterial ごとにインスタンスを生成する
     */
    constructor(scene: Scene, material: MToonMaterial);
    /**
     * @inheritdoc
     * シーン描画前後にレンダリング処理を登録する
     */
    register(): void;
    /**
     * @inheritdoc
     */
    rebuild(): void;
    /**
     * @inheritdoc
     */
    dispose(): void;
    /**
     * Renders the outline in the canvas.
     * @param subMesh Defines the sumesh to render
     * @param batch Defines the batch of meshes in case of instances
     * @param renderPassId Render pass id to use to render the mesh
     */
    private render;
    /**
     * このメッシュを描画した後に実行されるコールバック
     */
    private _afterRenderingMesh;
    /**
     * インスタンシングを行うかどうか
     */
    private isHardwareInstancedRendering;
    /**
     * このメッシュでアウトラインを描画するかどうか
     */
    private willRender;
}
