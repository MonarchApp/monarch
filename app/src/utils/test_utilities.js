import Sinon from 'sinon';

export const mockDispatch = async (action, ...args) => {
  const actionToDispatch = await action(...args);
  const dispatchSpy = Sinon.spy();
  await actionToDispatch(dispatchSpy);

  return dispatchSpy;
};
