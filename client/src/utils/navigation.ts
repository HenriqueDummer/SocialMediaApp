let navigator: any = null;

export const setNavigator = (navigate: any) => {
  navigator = navigate;
}

export const navigateTo = (path: string) => {
  if(navigator) {
    navigator(path);
  } else {
    console.error("Navigator is not set. Please set it using setNavigator function.");
  }
}