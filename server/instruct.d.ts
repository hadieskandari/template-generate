type PagesName = "index" | "explore" | "product" | "checkout";
type ComponentsName =
    | "simple-header"
    | "footer"
    | "product"
    | "product-2"
    | "checkout"
    | "simple-search"
    | "vide-search"
    | "category-carousel";
type ColorName =
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "white"
    | "transparent";
type PropsName = "value" | "v-model" | "color";
type PropsValue =
    | string
    | number
    | boolean
    | object
    | Array<any>
    | null
    | undefined
    | Function;

type ComponentsStructure = {
    component: ComponentsName;
    props?: Record<PropsName, PropsValue>;
    order?: number;
    customClass?: string;
    isLazy?: boolean;
    hideOnMobile?: boolean;
    hideOnDesktop?: boolean;
    slot?: {
        name: string;
        components: Array<ComponentsStructure>;
    };
    margin?: string;
    padding?: string;
};

type PageStructure = {
    name: PagesName;
    components: Array<ComponentsStructure>;
};

export type TemplateInstruct = {
    id: number;
    name: string;
    description: string;
    components: Array<ComponentsStructure>;
};
