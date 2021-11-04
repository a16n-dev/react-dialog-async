import { useContext, useEffect, useRef } from "react";
import DialogContext from "./DialogContext";
import { DialogComponent } from "./types";

const useDialog = <D, R>(component: DialogComponent<D, R>) => {

    const id = useRef<string>();
    
    const ctx = useContext(DialogContext);

    useEffect(() => {
        id.current = ctx.register(component)
        return () => {if (id.current) ctx.unregister(id.current)}
    }, [])

    const show = async (data: D): Promise<R | undefined> => {
        if (id.current) {
            return ctx.show(id.current, data);
        } else {
            throw new Error("No dialog component registered")
        }
    }

    const hide = () => {
        if (id.current) {
            return ctx.hide(id.current);
        } else {
            throw new Error("No dialog component registered")
        }
    }

    return {
        show,
        hide
    }
}

export default useDialog;