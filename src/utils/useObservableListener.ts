import { useEffect, useState } from "react";
import { Observable } from "./observable";

export default function useObservableListener<T>(observable: Observable<T>): T {
  const [counter, setCounter] = useState(observable.get());
  useEffect(
    () => {
      return observable.addListener(() => setCounter(observable.get()));
    },
    [
      /*observable Todo - check if observable should be in this?*/
    ]
  );
  return counter;
}
