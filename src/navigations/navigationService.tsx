import {createRef} from 'react';

export const navigationRef = createRef();

export function navigate(name: any) {
  //@ts-ignore
  navigationRef.current?.navigate(name);
}
