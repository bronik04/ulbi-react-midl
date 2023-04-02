import { classNames } from 'shared/lib/classNames/classNames';
import React, { ReactNode, useCallback, useEffect } from 'react';
import { Portal } from 'shared/ui/Portal/Portal';
import theme from '@storybook/addon-interactions/dist/ts3.9/theme';
import { useTheme } from 'app/providers/ThemeProvider';
import cls from './Modal.module.scss';

interface ModalProps {
    className?: string,
    children?: ReactNode,
    isOpen?: boolean,
    onClose?: () => void
}

export const Modal = (props: ModalProps) => {
    const {
        className, children, isOpen, onClose,
    } = props;
    const { theme } = useTheme();

    const mods = {
        [cls.opened]: isOpen,
    };

    const handleClose = useCallback(() => {
        if (onClose) onClose();
    }, [onClose]);

    const handleContentClick = (e: React.MouseEvent) => e.stopPropagation();

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            handleClose();
        }
    }, [handleClose]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    return (
        <Portal>
            <div className={classNames(cls.modal, mods, [className, theme, 'app__modal'])}>
                <div className={cls.overlay} onClick={handleClose}>
                    <div className={cls.content} onClick={handleContentClick}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
