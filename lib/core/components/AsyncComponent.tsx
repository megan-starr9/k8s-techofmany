import React, {
  useEffect,
  useState,
} from 'react';

type AsyncComponentProps<T> = T & {
  lazy: () => Promise<{ default: React.ComponentType<T>; }>;
  fallback: JSX.Element,
};

export default function AsyncComponent<T = void>({
  lazy,
  fallback,
  ...rest
}: AsyncComponentProps<T>) {
  const [Display, setDisplay] = useState(null);

  useEffect(() => {
    if (lazy) {
      lazy().then((component) => {
        setDisplay(component.default || component);
      })
    }
  })

  return Display ? <Display {...rest} /> : fallback;

}
