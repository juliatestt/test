import { Fragment, h } from 'preact';
import './SRPanel.scss';
import { SRPanelProps } from './types';
import BaseElement from '../../components/BaseElement';
// import { objectsDeepEqual } from '../../components/internal/SecuredFields/lib/utilities/commonUtils';
import { SRMessages, SRMessagesRef } from './SRMessages';

/**
 * A panel meant to hold messages that will be read out by ScreenReaders on an aria-live="polite" basis
 * Expects a string or string array of message to add to the panel to be read out
 * For testing purposes can be made visible
 */
export class SRPanel extends BaseElement<SRPanelProps> {
    public static defaultProps = {
        enabled: true,
        node: 'body',
        showPanel: false
    };

    private srPanelContainer = null;

    private readonly id;
    private readonly showPanel;
    // private msgPanel;
    // private msgHolder;

    private componentRef: SRMessagesRef;

    constructor(props: SRPanelProps) {
        super(props);
        this.id = 'ariaLiveSRPanel';
        this.showPanel = process.env.NODE_ENV !== 'production' ? this.props.showPanel : false;
        this.state = { panelMessages: null };

        console.log('### SRPanel::constructor:: this.props=', this.props);

        if (this.props.enabled) {
            if (document.querySelector(this.props.node)) {
                this.srPanelContainer = document.createElement('div');
                this.srPanelContainer.className = 'srPanel-holder';
                document.querySelector(this.props.node).appendChild(this.srPanelContainer);
                this.mount(this.srPanelContainer);

                // this.msgPanel = document.getElementById('ariaLiveSRPanel');
            } else {
                throw new Error('Component could not mount. Root node was not found.');
            }
        }
    }

    public setComponentRef = ref => {
        this.componentRef = ref;
    };

    // A method we can expose to allow comps to set messages in this panel
    public setMessages = (messages: string[] | string): void => {
        if (!this.props.enabled) return;

        let panelMessages = null;
        if (messages) {
            // Ensure panelMessages is an array
            panelMessages = Array.isArray(messages) ? messages : [messages];
        }

        // const oldMessages = this.state.panelMessages;
        //
        // this.setState({ panelMessages });
        //
        // // "re-render" if we have a new set of messages
        // const hasNewMessages = !objectsDeepEqual(oldMessages, panelMessages);
        // if (hasNewMessages) {
        //     this.createMessageElements(); // TODO - don't need any of this, nor, probably, do we need to store panelMessages on this.state (check we no longer need to check if messages have changed to prevent too many renders)

        this.componentRef.setMessages(panelMessages); // panelMessages
        // }
    };

    // public createMessageElements() {
    //     // Remove old holder
    //     if (this.msgHolder) {
    //         this.msgPanel.removeChild(this.msgHolder);
    //         this.msgHolder = null;
    //     }
    //
    //     // If we have new messages - create them and add them to the holder
    //     if (this.state.panelMessages) {
    //         this.msgHolder = document.createElement('div');
    //         this.msgHolder.className = 'adyen-checkout-sr-panel__msg-holder';
    //
    //         this.state.panelMessages.forEach(msg => {
    //             const msgDiv = document.createElement('div');
    //             msgDiv.className = 'adyen-checkout-sr-panel__msg';
    //             msgDiv.innerText = msg;
    //             this.msgHolder.appendChild(msgDiv);
    //         });
    //
    //         this.msgPanel.appendChild(this.msgHolder);
    //     }
    // }

    render() {
        console.log('### SRPanel::render:: ');
        return (
            // <div
            //     className={this.showPanel ? 'adyen-checkout-sr-panel' : 'adyen-checkout-sr-panel--sr-only'}
            //     id={this.id}
            //     aria-live={'polite'}
            //     aria-atomic={'true'}
            // >
            <Fragment>
                <SRMessages id={this.id} showPanel={this.showPanel} setComponentRef={this.setComponentRef} />
            </Fragment>
            // </div>
        );
    }
}
