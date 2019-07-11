import * as React from "react";
import "./modal.scss";

interface Props {
    readonly open: boolean
    readonly onClose: () => void
}

/** Modal presents some content as a modal dialog. */
export class Modal extends React.Component<Props> {
    public render = (): JSX.Element | null => {
        const { open, children } = this.props

        if (!open) {
            return null
        }

        return (
            <div className="modal">
                <div className="modal__container">
                    <div className="modal__close">
                        <button onClick={this.closeDidClick}>Close</button>
                    </div>
                    <div className="modal__content">
                        {children}
                    </div>
                </div>
            </div>
        )
    }

    private closeDidClick = () => {
        this.props.onClose()
    }
}