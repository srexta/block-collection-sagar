import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import './editor.scss';

import { 
	Button,
	TextControl, 
	TextareaControl,
	Panel,
	PanelBody,
	PanelRow,
	ColorPicker,
	SelectControl,
	RangeControl
} from '@wordpress/components';
import { useState } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
	// Initialize FAQ items state if not already set
	const [faqs, setFaqs] = useState(attributes.faqs || []);
	// Track which FAQ is currently open
	const [openFaqIndex, setOpenFaqIndex] = useState(null);

	// Initialize style settings
	const [style, setStyle] = useState(attributes.style || {
		backgroundColor: '',
		textColor: '',
		fontSize: '',
		questionColor: '',
		answerColor: '',
		borderColor: '#ddd',
		questionPadding: '15',
		questionMargin: '0',
		answerPadding: '15',
		answerMargin: '0',
		// Add section padding
		sectionPaddingTop: '20',
		sectionPaddingBottom: '20',
		sectionPaddingLeft: '20',
		sectionPaddingRight: '20'
	});

	// Update style settings
	const updateStyle = (key, value) => {
		const newStyle = { ...style, [key]: value };
		setStyle(newStyle);
		setAttributes({ style: newStyle });
	};

	// Add new FAQ item
	const addFaq = () => {
		setFaqs([...faqs, { 
			question: '', 
			answer: '' 
		}]);
		setAttributes({ faqs: [...faqs, { question: '', answer: '' }] });
		// Close any open FAQ when adding new one
		setOpenFaqIndex(null);
	};

	// Remove FAQ item
	const removeFaq = (index) => {
		const newFaqs = faqs.filter((_, i) => i !== index);
		setFaqs(newFaqs);
		setAttributes({ faqs: newFaqs });
		// Reset open FAQ index if the removed item was open
		if (openFaqIndex === index) {
			setOpenFaqIndex(null);
		} else if (openFaqIndex > index) {
			// Adjust the open index if we removed an item before it
			setOpenFaqIndex(openFaqIndex - 1);
		}
	};

	// Update FAQ item
	const updateFaq = (index, field, value) => {
		const newFaqs = faqs.map((faq, i) => {
			if (i === index) {
				return { ...faq, [field]: value };
			}
			return faq;
		});
		setFaqs(newFaqs);
		setAttributes({ faqs: newFaqs });
	};

	// Toggle FAQ open/close
	const toggleFaq = (index) => {
		setOpenFaqIndex(openFaqIndex === index ? null : index);
	};

	const fontSizeOptions = [
		{ label: __('Default', 'block-collection-sagar'), value: '' },
		{ label: __('Small', 'block-collection-sagar'), value: '14px' },
		{ label: __('Medium', 'block-collection-sagar'), value: '16px' },
		{ label: __('Large', 'block-collection-sagar'), value: '18px' },
		{ label: __('Extra Large', 'block-collection-sagar'), value: '20px' }
	];

	// Generate styles for the FAQ container
	const containerStyle = {
		backgroundColor: style.backgroundColor || 'transparent',
		color: style.textColor || 'inherit',
		fontSize: style.fontSize || 'inherit',
		'--faq-question-color': style.questionColor || 'inherit',
		'--faq-answer-color': style.answerColor || 'inherit',
		'--faq-border-color': style.borderColor || '#ddd',
		'--faq-question-padding': `${style.questionPadding}px`,
		'--faq-question-margin': `${style.questionMargin}px`,
		'--faq-answer-padding': `${style.answerPadding}px`,
		'--faq-answer-margin': `${style.answerMargin}px`,
		// Add section padding
		paddingTop: `${style.sectionPaddingTop}px`,
		paddingBottom: `${style.sectionPaddingBottom}px`,
		paddingLeft: `${style.sectionPaddingLeft}px`,
		paddingRight: `${style.sectionPaddingRight}px`
	};

	return (
		<>
			<InspectorControls>
				<Panel>
					<PanelBody title={__('Style Settings', 'block-collection-sagar')}>
						<div className="faq-style-controls">
							<div className="color-control">
								<label>{__('Background Color', 'block-collection-sagar')}</label>
								<ColorPicker
									color={style.backgroundColor}
									onChange={(value) => updateStyle('backgroundColor', value)}
									enableAlpha
								/>
							</div>

							<div className="color-control">
								<label>{__('Question Color', 'block-collection-sagar')}</label>
								<ColorPicker
									color={style.questionColor}
									onChange={(value) => updateStyle('questionColor', value)}
								/>
							</div>

							<div className="color-control">
								<label>{__('Answer Color', 'block-collection-sagar')}</label>
								<ColorPicker
									color={style.answerColor}
									onChange={(value) => updateStyle('answerColor', value)}
								/>
							</div>

							<div className="color-control">
								<label>{__('Border Color', 'block-collection-sagar')}</label>
								<ColorPicker
									color={style.borderColor}
									onChange={(value) => updateStyle('borderColor', value)}
								/>
							</div>

							<SelectControl
								label={__('Font Size', 'block-collection-sagar')}
								value={style.fontSize}
								options={fontSizeOptions}
								onChange={(value) => updateStyle('fontSize', value)}
							/>

							<PanelBody 
								title={__('Section Padding', 'block-collection-sagar')} 
								initialOpen={false}
							>
								<RangeControl
									label={__('Top Padding', 'block-collection-sagar')}
									value={parseInt(style.sectionPaddingTop)}
									onChange={(value) => updateStyle('sectionPaddingTop', value)}
									min={0}
									max={100}
									allowReset
									resetFallbackValue={20}
								/>
								<RangeControl
									label={__('Bottom Padding', 'block-collection-sagar')}
									value={parseInt(style.sectionPaddingBottom)}
									onChange={(value) => updateStyle('sectionPaddingBottom', value)}
									min={0}
									max={100}
									allowReset
									resetFallbackValue={20}
								/>
								<RangeControl
									label={__('Left Padding', 'block-collection-sagar')}
									value={parseInt(style.sectionPaddingLeft)}
									onChange={(value) => updateStyle('sectionPaddingLeft', value)}
									min={0}
									max={100}
									allowReset
									resetFallbackValue={20}
								/>
								<RangeControl
									label={__('Right Padding', 'block-collection-sagar')}
									value={parseInt(style.sectionPaddingRight)}
									onChange={(value) => updateStyle('sectionPaddingRight', value)}
									min={0}
									max={100}
									allowReset
									resetFallbackValue={20}
								/>
							</PanelBody>

							<PanelBody 
								title={__('Question Spacing', 'block-collection-sagar')} 
								initialOpen={false}
							>
								<RangeControl
									label={__('Padding', 'block-collection-sagar')}
									value={parseInt(style.questionPadding)}
									onChange={(value) => updateStyle('questionPadding', value)}
									min={0}
									max={50}
									allowReset
									resetFallbackValue={15}
								/>
								<RangeControl
									label={__('Margin', 'block-collection-sagar')}
									value={parseInt(style.questionMargin)}
									onChange={(value) => updateStyle('questionMargin', value)}
									min={0}
									max={50}
									allowReset
									resetFallbackValue={0}
								/>
							</PanelBody>

							<PanelBody 
								title={__('Answer Spacing', 'block-collection-sagar')} 
								initialOpen={false}
							>
								<RangeControl
									label={__('Padding', 'block-collection-sagar')}
									value={parseInt(style.answerPadding)}
									onChange={(value) => updateStyle('answerPadding', value)}
									min={0}
									max={50}
									allowReset
									resetFallbackValue={15}
								/>
								<RangeControl
									label={__('Margin', 'block-collection-sagar')}
									value={parseInt(style.answerMargin)}
									onChange={(value) => updateStyle('answerMargin', value)}
									min={0}
									max={50}
									allowReset
									resetFallbackValue={0}
								/>
							</PanelBody>
						</div>
					</PanelBody>
				</Panel>
			</InspectorControls>

			<div {...useBlockProps({ style: containerStyle })}>
				<Panel>
					<PanelBody title={__('FAQ Items', 'block-collection-sagar')}>
						{faqs.map((faq, index) => (
							<div key={index} className="faq-item">
								<div 
									className="faq-question-header"
									onClick={() => toggleFaq(index)}
								>
									<span className="faq-question-text">
										{faq.question || __('Add a question...', 'block-collection-sagar')}
									</span>
									<span className="toggle-icon">
										{openFaqIndex === index ? '-' : '+'}
									</span>
								</div>
								{openFaqIndex === index && (
									<div className="faq-content">
										<TextControl
											label={__('Question', 'block-collection-sagar')}
											value={faq.question}
											onChange={(value) => updateFaq(index, 'question', value)}
										/>
										<TextareaControl
											label={__('Answer', 'block-collection-sagar')}
											value={faq.answer}
											onChange={(value) => updateFaq(index, 'answer', value)}
										/>
										<Button 
											isDestructive
											onClick={() => removeFaq(index)}
										>
											{__('Remove FAQ', 'block-collection-sagar')}
										</Button>
									</div>
								)}
							</div>
						))}
						<Button
							variant="primary"
							onClick={addFaq}
						>
							{__('Add FAQ', 'block-collection-sagar')}
						</Button>
					</PanelBody>
				</Panel>
			</div>
		</>
	);
}
