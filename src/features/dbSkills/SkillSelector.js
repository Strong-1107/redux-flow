import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSkills, selectAllskills } from './dbSkillsSlice';
// import Autocomplete from "../../helpers/Autocomplete";
import Select from 'react-select';

const SkillSelector = ({ wasSubmitted }) => {
	const dispatch = useDispatch();

	const skills = useSelector(selectAllskills)

	const skillsArr = [];

	for (const skillKey in skills) {
		if (Object.hasOwnProperty.call(skills, skillKey)) {
			const skill = skills[skillKey];
			skillsArr.push(skill);
		}
	}
	// const skillNames = skills.map(skill => skill.name)

	const skillStatus = useSelector((state) => state.skills.status)

	useEffect(() => {
    if (skillStatus === 'idle') {
      dispatch(fetchSkills())
    }
	}, [skillStatus, dispatch])
	
  let fetchedSkills
  if (skillStatus === 'loading') {
    fetchedSkills = null
  } else if (skillStatus === 'succeeded') {
    fetchedSkills = skills
  } else if (skillStatus === 'failed') {
		console.error(skillStatus)
	}
	let skillOptions = []
	// eslint-disable-next-line no-unused-vars
	const SkillSelector = fetchedSkills ? fetchedSkills.forEach((skill) => {
		let skillObj = { value: skill.name, label: skill.name}
		skillOptions.push(skillObj)
	}) : "";

	const handleChange = (options) => {
		console.log("options in handle change: ", options);
		const selectedSkills = []
		options.forEach(option => {
			console.log("each option: ", option);
			// eslint-disable-next-line array-callback-return
			skillsArr.filter(skill => {
				if (skill.name === option.value) {
					console.log(skill.name);
					selectedSkills.push(skill.id)
				}
			})
		})
		console.log("skills arr: ", selectedSkills);
    	localStorage.setItem('selected_skills', JSON.stringify(selectedSkills))
	}
	// console.log("submitted props in selector: ", wasSubmitted);

	return (
		<div className="md:grid grid-cols-3">
			<label 
			className="mr-2 flex justify-center md:justify-end items-center"
			htmlFor="skills">Select skill(s): </label>
			<Select
			onChange={(e) => handleChange(e)}
			defaultValue="Select a Skill"
			isMulti
			name="skills"
			options={skillOptions}
			className="basic-multi-select"
			classNamePrefix="select"
		/>
		</div>
	);
};

export default SkillSelector;