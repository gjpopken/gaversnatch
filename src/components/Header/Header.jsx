import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';

export const Header = () => {
    const dispatch = useDispatch()
    const menuLeft = useRef(null);
    const toast = useRef(null);
    const items = [
        {
            label: 'Menu',
            items: [
                {
                    label: 'Logout',
                    command: () => dispatch({type: "LOGOUT"})
                }
            ]
        }
    ];

    return (
        <div className="card flex justify-content-center">
            <Toast ref={toast}></Toast>
            <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
            <Button label="Menu" className="mr-2" onClick={(event) => menuLeft.current.toggle(event)} aria-controls="popup_menu_left" aria-haspopup />        
        </div>
    )
}