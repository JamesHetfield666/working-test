import * as React from 'react';
import { useRef, useState } from 'react';
import styles from '../styles/input.module.scss';
import Loader from '../loaders/Loader';
import { MdOutlineClose } from 'react-icons/md';


const Select = (props) => {
    const input = useRef<HTMLInputElement>(null);
    const [show, setShow] = useState(false);
    const [value, setValue] = useState("");

    const handlerBlur = () => {
        setTimeout(() => {
            setShow(false)
        }, 100)
    }

    const handlerItem = (item) => {
        props.selected(item);
        setValue(item.Title || item);
        if (props.setFieldValue) props.setFieldValue(props.name, item.Title)
    }

    const handlerFocus = () => {
        setShow(true)
    }

    const clearValue = () => {
        props.selected(null);
        setValue('');
        if (props.setFieldValue) props.setFieldValue(props.name, '')
    }

    const styleLoader = {
        position: 'absolute',
        zIndex: 2,
        right: 0,
    }

    return(
        <div className={styles.inputWrapper}>
            <input
            name={props.name}
            ref={input}
            className={`${styles[props.class]} ${props.error ? styles['inputError'] : ''}`}
            placeholder={props.placeholder}
            style={props.styleInput}
            onBlur={handlerBlur}
            onFocus={handlerFocus}
            onChange={props.onChange}
            autoComplete="off"
            value={value}
            onInputCapture={(event) => setValue(event.currentTarget.value)}
            onInput={props.onInput}
            >
            </input>
            {props.loading && <Loader dark={true} width='25px' styleLoader={styleLoader}/>}
            {value && <MdOutlineClose onClick={clearValue}/>}
            {props.child.length != 0 && show && <div className={styles.helper} style={{background: props.class === 'modalInput' ? '#f5f6fa' : '#FFF'}}></div>}
            <div className={`${styles.inputSearchWrapper} ${props.child.length && show ? styles.inputSearchItemShow : styles.inputSearchItemHide}`} style={{background: props.class === 'modalInput' ? '#f5f6fa' : '#FFF'}}>
                <div className={styles.inputSearchItems}>
                    {props.child.filter(text => text.Title.toLowerCase().search(value.toLowerCase()) != -1 ? text.Title : null).map(item => {
                        return <div className={styles.inputSearchItem} onClick={() => handlerItem(item)}>{item.Title || item}</div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Select;