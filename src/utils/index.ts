import deepcopy from 'deepcopy';
import { computed, getCurrentInstance, watch } from 'vue';

/**
 * @description: props数据接口
 * @return {*}
 */
interface Props {
    containerWidth: number;
    containerHeight: number;
}
/**
 * @description: 属性默认值数据
 * @return {*}
 */
interface PropsOptions {
    0: {
        containerWidth: {
            default: number;
        };
        containerHeight: {
            default: number;
        };
    };
    [key: number]: any;
    length: 0;
}
/**
 * @description: 应用尺寸缩放功能
 * @return {*}
 */
export default function useZoom({
    props,
}: {
    props: Props;
}) {
    const instance: any = getCurrentInstance();
    const { propsOptions }: { propsOptions: PropsOptions } = instance;
    return {
    /**
     * @description: 根据父容器尺寸，获取指定方向上某尺寸的缩放值
     * @return {*}
     */
        zoom: computed((): any => {
            return (size: number, direction: 'w' | 'h', unit?: string) => {
                return zoom({
                    size,
                    direction,
                    unit,
                    props,
                    propsOptions,
                });
            };
        }),
        /**
     * @description: 根据父容器尺寸，获取水平与垂直方向某尺寸的较小的缩放值
     * @return {*}
     */
        zoomMin: computed((): any => {
            return (size: number, unit?: string) => {
                return zoomMin({
                    size,
                    unit,
                    props,
                    propsOptions,
                });
            };
        }),
        /**
     * @description: 根据父容器尺寸，获取水平与垂直方向某尺寸的较大的缩放值
     * @return {*}
     */
        zoomMax: computed((): any => {
            return (size: number, unit?: string) => {
                return zoomMax({
                    size,
                    unit,
                    props,
                    propsOptions,
                });
            };
        }),
        scale: computed((): any => {
            return (direction: 'w' | 'h', multiple?: number) => {
                return scale({
                    direction,
                    props,
                    multiple,
                    propsOptions,
                });
            };
        }),
        scaleMin: computed((): any => {
            return (multiple?: number) => {
                return scaleMin({
                    multiple,
                    props,
                    propsOptions,
                });
            };
        }),
        scaleMax: computed((): any => {
            return (multiple?: number) => {
                return scaleMax({
                    multiple,
                    props,
                    propsOptions,
                });
            };
        }),
    };
}
/**
 * @description: 缩放后，指定方向的尺寸值
 * @param {number} size
 * @param {object} instance
 * @param {string} unit
 * @return {*}
 */
export function zoom({
    size,
    direction,
    props,
    propsOptions,
    unit,
}: {
    size: number;
    direction: 'w' | 'h';
    props: Props;
    propsOptions: PropsOptions;
    unit?: string;
}): number | string {
    let containerWidth: number;
    let containerHeight: number;
    let containerWidthDefault: number;
    let containerHeightDefault: number;
    try {
        const { containerWidth: { default: theContainerWidthDefault }, containerHeight: { default: theContainerHeightDefault } } = propsOptions[0];
        containerWidthDefault = theContainerWidthDefault;
        containerHeightDefault = theContainerHeightDefault;
        const { containerWidth: theContainerWidth, containerHeight: theContainerHeight } = props;
        containerWidth = theContainerWidth;
        containerHeight = theContainerHeight;
    } catch (e) {
        throw new Error('该组件没有设置默认容器尺寸参数containerWidth containerHeight');
    }
    if (containerWidthDefault <= 0) {
        throw new Error('该组件设置的默认容器宽度参数containerWidth小于或等于0了');
    }
    if (containerHeightDefault <= 0) {
        throw new Error('该组件设置的默认容器高度参数containerHeight小于或等于0了');
    }
    const value: number = direction === 'w' ? size * containerWidth / containerWidthDefault : size * containerHeight / containerHeightDefault;
    return unit === undefined ? value : `${value}${unit}`;
}
/**
 * @description: 缩放后，指定方向的缩放倍数值
 * @param {number} size
 * @param {object} instance
 * @param {string} unit
 * @return {*}
 */
export function scale({
    direction,
    props,
    multiple = 1,
    propsOptions,
}: {
    direction: 'w' | 'h';
    props: Props;
    multiple?: number;
    propsOptions: PropsOptions;
}): number {
    let containerWidth: number;
    let containerHeight: number;
    let containerWidthDefault: number;
    let containerHeightDefault: number;
    try {
        const { containerWidth: { default: theContainerWidthDefault }, containerHeight: { default: theContainerHeightDefault } } = propsOptions[0];
        containerWidthDefault = theContainerWidthDefault;
        containerHeightDefault = theContainerHeightDefault;
        const { containerWidth: theContainerWidth, containerHeight: theContainerHeight } = props;
        containerWidth = theContainerWidth;
        containerHeight = theContainerHeight;
    } catch (e) {
        throw new Error('该组件没有设置默认容器尺寸参数containerWidth containerHeight');
    }
    if (containerWidthDefault <= 0) {
        throw new Error('该组件设置的默认容器宽度参数containerWidth小于或等于0了');
    }
    if (containerHeightDefault <= 0) {
        throw new Error('该组件设置的默认容器高度参数containerHeight小于或等于0了');
    }
    const value: number = direction === 'w' ? containerWidth / containerWidthDefault : containerHeight / containerHeightDefault;
    return value * multiple;
}
/**
 * @description: 缩放后，取缩放宽高后尺寸较小的一个方向的尺寸值
 * @param {number} size
 * @param {object} instance
 * @param {string} unit
 * @return {*}
 */
export function zoomMin({
    size,
    props,
    propsOptions,
    unit,
}: {
    size: number;
    props: Props;
    propsOptions: PropsOptions;
    unit?: string;
}): number | string {
    const value = Math.min(<number>zoom({
        size,
        props,
        propsOptions,
        direction: 'w',
    }), <number>zoom({
        size,
        props,
        propsOptions,
        direction: 'h',
    }));
    return unit === undefined ? value : `${value}${unit}`;
}
/**
 * @description: 缩放后，取缩放宽高后尺寸较小的一个方向的尺寸值
 * @param {number} size
 * @param {object} instance
 * @param {string} unit
 * @return {*}
 */
export function zoomMax({
    size,
    props,
    propsOptions,
    unit,
}: {
    size: number;
    props: Props;
    propsOptions: PropsOptions;
    unit?: string;
}): number | string {
    const value = Math.max(<number>zoom({
        size,
        props,
        propsOptions,
        direction: 'w',
    }), <number>zoom({
        size,
        props,
        propsOptions,
        direction: 'h',
    }));
    return unit === undefined ? value : `${value}${unit}`;
}
export function scaleMin({
    props,
    propsOptions,
    multiple = 1,
}: {
    props: Props;
    propsOptions: PropsOptions;
    multiple?: number;
}) {
    const value = Math.min(<number>scale({
        direction: 'w',
        multiple,
        props,
        propsOptions,
    }), <number>scale({
        direction: 'h',
        multiple,
        props,
        propsOptions,
    }));
    return value;
}
export function scaleMax({
    props,
    propsOptions,
    multiple = 1,
}: {
    props: Props;
    propsOptions: PropsOptions;
    multiple?: number;
}) {
    const value = Math.max(<number>scale({
        direction: 'w',
        multiple,
        props,
        propsOptions,
    }), <number>scale({
        direction: 'h',
        multiple,
        props,
        propsOptions,
    }));
    return value;
}
/**
 * @description: 给数字加上单位
 * @param {number} number
 * @param {string} unit
 * @return {*}
 */
export function numberWithUnit(number: number, unit?: string): string {
    unit = typeof unit === 'string' ? unit : 'px';
    return `${number}${unit}`;
}

/**
*
* @param hex 例如:"#23ff45"
* @param opacity 透明度
* @returns {string}
*/
export function hexToRgba(hex: string, opacity: string | number = 1) {
    return `rgba(${parseInt(`0x${hex.slice(1, 3)}`)},${parseInt(`0x${hex.slice(3, 5)}`)},${parseInt(`0x${hex.slice(5, 7)}`)},${opacity})`;
}
/**
 * @description: 数字超过10W 显示为10W+
 * @param {*} number
 * @return {*}
 */
export const numberValueFormat = (number: number) => {
    if (number !== undefined && !isNaN(number)) {
        return number > 10e4 ? '10W+' : number;
    } else {
        return '';
    }
};
/**
 * [numberValueFormatPravite 数字格式化：拆分数字和文字]
 *
 * @return  {[type]}  [return description]
 */
export const numberValueFormatPraviteSeparate = (
    value: number | string,
    decimals = 0, // 是否省略小数点
    split = false, // 是否拆分数字和单位
    transition = false, // 是否进行转换为 1,000,000
    millionFor100 = false, // 单独针对1000w+不到亿的数据,展示为0.5e
): {
    count: number;
    unit: string;
} | string | number => {
    if (!isNaN(<number>value)) {
        let countingUnit = '';
        value = Number(value);
        if (value >= 1e8) {
            value = value / 1e8;
            countingUnit = '亿';
        } else if (millionFor100 && value < 1e8 && value > 1e4) {
            value = value / 1e8;
            countingUnit = '亿';
        } else if (value >= 1e4) {
            value = value / 1e4;
            countingUnit = '万';
        } else {
            value = transition ? numberValueFormat(value) : value;
        }
        return split
            ? {
                count: Number((<number>value).toFixed(decimals)),
                unit: countingUnit,
            }
            : `${(<number>value).toFixed(decimals)}${countingUnit}`;
    } else {
        return 0;
    }
};
/**
 * @description: 运行字符串类型的js代码，常用在props中 inputType为jsEditor的属性的自定义外接代码的安全执行
 * @param {*} code
 * @param {*} params
 * @return {*}
 */
export function evalJsCode({ code, data, propName }: { code: string; data: any; propName: string }): any {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data = deepcopy(data);
    // (_data? => { })(data);
    const theCode = `((data)=>{
    let window = undefined;
    let XMLHttpRequest = undefined;
    let fetch = undefined;
    let alert = undefined;
    let document = undefined;
    ${code}
  })(data)`;
    try {
        // eslint-disable-next-line no-eval
        return eval(theCode);
    } catch (e: any) {
        const stack = e && typeof e.stack === 'string' ? e.stack : e.toString();
        console.log(`“${propName}”样式，代码运行有误，请检查`);
        console.warn(stack);
        return {};
    }
}

/**
 * @description: 监听props变化，用于触发渲染程序,常用在echarts图表组件的配置修改后重新渲染
 * @return {*}
 */
export function watchProps(props: Record<string, any>, callback: any) {
    const propsArray = Object.keys(props).map(key => {
        return () => props[key];
    });
    watch(propsArray, () => {
        callback();
    }, {
        immediate: true,
    });
}
/**
 * @description: 获取真实偏移量，无视页面缩放
 * @return {*}
 */
export function getOffset({ el, offsetX = 0, offsetY = 0 }: { el: HTMLElement; offsetX?: number; offsetY?: number }): { offsetX: number; offsetY: number } {
    const parentElement = <HTMLElement>el.parentElement;
    if (!parentElement) {
        return { offsetX, offsetY };
    }
    const { offsetLeft, offsetTop } = parentElement;
    const { transform } = getComputedStyle(parentElement);
    let theTransform: string | number[] = transform;
    let translateLeft = 0;
    let translateTop = 0;
    if (/^matrix3d\(/.test(transform)) {
        theTransform = transform.replace(/^matrix3d\(/, '').replace(/\)/, '');
        theTransform = theTransform.split(',').map(item => {
            return Number(item);
        });
        translateLeft = theTransform[12];
        translateTop = theTransform[13];
    } else if (/^matrix\(/.test(transform)) {
        theTransform = transform.replace(/^matrix\(/, '').replace(/\)/, '');
        theTransform = theTransform.split(',').map(item => {
            return Number(item);
        });
        translateLeft = theTransform[4];
        translateTop = theTransform[5];
    }
    offsetX += (offsetLeft + translateLeft);
    offsetY += (offsetTop + translateTop);
    return getOffset({
        el: <HTMLElement>parentElement,
        offsetX,
        offsetY,
    });
}
