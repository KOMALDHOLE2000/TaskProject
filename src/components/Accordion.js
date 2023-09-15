import React, { useState } from 'react';
import './Accordion.css';

const Accordion = ({ title, questions, onAnswerChange, editable }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOperation, setEditOperation] = useState(false);

    const handleToggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const handleEdit = () => {
        setEditOperation(true);
    }
    const handleSave = () => {
        // Handle saving answers (e.g., send to server or store in state)
        editable = false;
        setIsOpen(false);
        setEditOperation(false);
    };

    const handleCancel = () => {
        // Handle canceling edits (e.g., reset to previous state)
        setIsOpen(false);
        editable = false;
        setEditOperation(false);
    };



    return (
        <div className={`accordion ${isOpen ? 'open' : ''}`}>
            <div className='accordion-header' onClick={handleToggleAccordion}>
                <h3 className='accordion-title' onClick={handleToggleAccordion}>
                    {title}
                </h3>
                <span className="accordion-control" onClick={handleToggleAccordion}>
                    {isOpen
                        ? <i class="gg-chevron-down"></i>
                        : <i class="gg-chevron-right"></i>}
                </span>
            </div>
            <section className='accordion-content'>
                <div className='questions'>
                    {isOpen && (
                        questions.map((question, index) => (
                            <div key={index} className={`question${question.id}`}>
                                <p>{question.text}</p>
                                <div className='radio-btns'>
                                    <label onClick={handleEdit}>
                                        <input
                                            type="radio"
                                            name={`question${question.id}`}
                                            value="Yes"
                                            checked={question.defaultAnswer === 'Yes'}
                                            onChange={(e) => onAnswerChange(index, e.target.value)}
                                            disabled={!editable}
                                        />
                                        Yes
                                    </label>
                                    <label onClick={handleEdit}>
                                        <input
                                            type="radio"
                                            name={`question${question.id}`}
                                            value="No"
                                            checked={question.defaultAnswer === 'No'}
                                            onChange={(e) => onAnswerChange(index, e.target.value)}
                                            disabled={!editable}
                                        />
                                        No
                                    </label>
                                    <label onClick={handleEdit}>
                                        <input
                                            type="radio"
                                            name={`question${question.id}`}
                                            value="NA"
                                            checked={question.defaultAnswer === 'NA'}
                                            onChange={(e) => onAnswerChange(index, e.target.value)}
                                            disabled={!editable}
                                        />
                                        NA
                                    </label>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className='accordion-edit'>
                    {isOpen && editable && isEditOperation && (
                        <div>
                            <button className='saveBtn' onClick={handleSave}>Save</button>
                            <button className='cancelBtn' onClick={handleCancel}>Cancel</button>
                        </div>
                    )}
                </div>

            </section>
        </div>
    );
};

export default Accordion;
