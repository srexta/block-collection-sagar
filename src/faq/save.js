import { useBlockProps } from '@wordpress/block-editor';
import './style.scss';

export default function save({ attributes }) {
	const { faqs, style } = attributes;

	const containerStyle = {
		backgroundColor: style?.backgroundColor || 'transparent',
		color: style?.textColor || 'inherit',
		fontSize: style?.fontSize || 'inherit',
		'--faq-question-color': style?.questionColor || 'inherit',
		'--faq-answer-color': style?.answerColor || 'inherit',
		'--faq-border-color': style?.borderColor || '#ddd',
		'--faq-question-padding': `${style?.questionPadding || 15}px`,
		'--faq-question-margin': `${style?.questionMargin || 0}px`,
		'--faq-answer-padding': `${style?.answerPadding || 15}px`,
		'--faq-answer-margin': `${style?.answerMargin || 0}px`,
		paddingTop: `${style?.sectionPaddingTop || 20}px`,
		paddingBottom: `${style?.sectionPaddingBottom || 20}px`,
		paddingLeft: `${style?.sectionPaddingLeft || 20}px`,
		paddingRight: `${style?.sectionPaddingRight || 20}px`
	};

	return (
		<div { ...useBlockProps.save({ style: containerStyle }) } className="wp-block-block-collection-sagar-faq">
			{faqs && faqs.map((faq, index) => (
				<div key={index} className="faq-item">
					<div 
						className="faq-question"
						data-aria-expanded="false"
						data-controls={`faq-answer-${index}`}
					>
						<span className="question-text">{faq.question}</span>
						<span className="toggle-icon">+</span>
					</div>
					<div 
						id={`faq-answer-${index}`}
						className="faq-answer"
						hidden
					>
						{faq.answer}
					</div>
				</div>
			))}
		</div>
	);
}
