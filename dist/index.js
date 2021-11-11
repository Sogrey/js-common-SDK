import { defined } from "./defined";
import { defaultValue } from "./defaultValue";
import { DeveloperError } from './DeveloperError';
import { CNumber } from './CNumber/CNumber';
import { CArray } from './CArray/CArray';
import { CString } from './CString/CString';
import { CFormat } from './CFormat/CFormat';
import { CStorage } from './CStorage/CStorage';
import { CCookie } from './CCookie/CCookie';
import { CRegular } from './CRegular/CRegular';
import { CUrl } from './CUrl/CUrl';
import { CDevice } from './CDevice/CDevice';
import { CBrowser } from './CBrowser/CBrowser';
import { CDataTime } from './CDataTime/CDataTime';
import { CMath3D } from './CMath3D/CMath3D';
const JSC = {
    VERSION: "0.0.1",
    test: () => {
        console.log("Hi,It's running.");
    },
    defined: defined,
    defaultValue: defaultValue,
    DeveloperError: DeveloperError,
    CNumber: CNumber,
    CArray: CArray,
    CString: CString,
    CFormat: CFormat,
    CStorage: CStorage,
    CCookie: CCookie,
    CRegular: CRegular,
    CUrl: CUrl,
    CDevice: CDevice,
    CBrowser: CBrowser,
    CDataTime: CDataTime,
    CMath3D: CMath3D,
};
export default JSC;
export { defined } from "./defined";
export { defaultValue } from "./defaultValue";
export { DeveloperError } from './DeveloperError';
export { CNumber } from './CNumber/CNumber';
export { CArray } from './CArray/CArray';
export { CString } from './CString/CString';
export { CFormat } from './CFormat/CFormat';
export { CStorage } from './CStorage/CStorage';
export { CCookie } from './CCookie/CCookie';
export { CRegular } from './CRegular/CRegular';
export { CUrl } from './CUrl/CUrl';
export { CDevice } from './CDevice/CDevice';
export { CBrowser } from './CBrowser/CBrowser';
export { CDataTime } from './CDataTime/CDataTime';
export * from './CMath3D/CMath3D';
//# sourceMappingURL=index.js.map