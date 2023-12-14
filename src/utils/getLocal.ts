export function getLocal<T>(localName: string): T | null {
    const data = localStorage.getItem(localName);
    if (data) {
      return JSON.parse(data) as T;
    }
  return null;
}

export function setLocal(localName: string, theData: any): void {
    const jsonData = JSON.stringify(theData);
    localStorage.setItem(localName, jsonData);
}

