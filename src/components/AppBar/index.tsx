/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import {
 AppBar,
 Button,
 MenuList,
 MenuListItem,
 Separator,
 Frame,
 Toolbar,
 Window,
 WindowContent,
 WindowHeader
} from 'react95';
import vocabulary from '../../vocabulary'
import { WindowComponent } from '../WindowComponent';

export function AppBarComponent() {
  const [open, setOpen] = useState(false);

  return (
    <AppBar style={{ zIndex: 99 }}>
      <Toolbar style={{ justifyContent: 'space-between', zIndex: 99 }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <Button
            onClick={() => setOpen(!open)}
            active={open}
            style={{ fontWeight: 'bold' }}
          >
            <img
              src={'/logo.png'}
              alt='react95 logo'
              style={{ height: '20px', marginRight: 4 }}
            />
            {vocabulary.companyName}
          </Button>
       
        </div>

        {/* <TextInput placeholder='Search...' width={150} /> */}
      </Toolbar>
      {open && (
            <Window className='window' style={{
             position: 'absolute',
              // width: '300px',
              // height: '200px',
              maxWidth: '400px',
              left: '35%',
              top: '400%',
             }}>
             <WindowHeader className='window-title'>
               <span>{vocabulary.aboutThis}</span>
             </WindowHeader>
             <WindowContent>
               <p>
               {vocabulary.aboutThisDescription}
               </p>
             </WindowContent>
            </Window>         
          )}
    </AppBar>
  );
}

