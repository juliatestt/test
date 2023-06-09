import { h } from 'preact';
import { useCallback } from 'preact/hooks';
import IssuerButton from './IssuerButton';
import useCoreContext from '../../../../core/Context/useCoreContext';
import './IssuerButtonGroup.scss';
import { IssuerItem } from '../types';

interface IssuerButtonGroupProps {
    items: IssuerItem[];
    selectedIssuerId: string;
    onChange: (event: UIEvent) => void;
}

const IssuerButtonGroup = ({ items = [], selectedIssuerId, onChange }: IssuerButtonGroupProps) => {
    const { i18n } = useCoreContext();

    const handleClick = useCallback(
        (event: UIEvent) => {
            const value = (event.currentTarget as HTMLButtonElement).value;
            Object.defineProperty(event.target, 'value', { value });
            onChange(event);
        },
        [onChange]
    );

    return (
        <div className="adyen-checkout__issuer-button-group" role="group" aria-label={i18n.get('idealIssuer.selectField.placeholder')}>
            {items.map(issuer => (
                <IssuerButton key={issuer.id} {...issuer} selected={selectedIssuerId === issuer.id} onClick={handleClick} />
            ))}
        </div>
    );
};

export default IssuerButtonGroup;
