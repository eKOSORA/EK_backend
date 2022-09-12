export const _try = () => {
  console.log('_try decorator called');
  try {
    return function (target: any, propertyKey: string, descriptor: any) {
      //   console.log(target, propertyKey, descriptor);
    };
  } catch (e) {
    console.log('FAAAAAAAAAAILED');
  }
};
