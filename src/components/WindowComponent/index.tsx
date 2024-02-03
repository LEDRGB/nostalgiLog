import React from 'react';
import {
  Button,
  Frame,
  Toolbar,
  Window,
  WindowContent,
  WindowHeader
} from 'react95';

interface IWindow {
  title: string,
  description: string,
  children: JSX.Element
}

 export function WindowComponent({title, description, children}: IWindow) {
  return (
    <>
      <Window className='window'>
        <WindowHeader className='window-title'>
          <span>{title}</span>
        </WindowHeader>
        <WindowContent>
          <p>
            {description}
          </p>
          {children}
        </WindowContent>
      </Window>
    </>
  );
}

