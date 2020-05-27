import React from 'react';
import { Tabs } from '../Tabs';
import { QuestionsList } from '../QuestionsList';
import { QuestionTypes } from '../../utils';

const tabs = [{
  label: 'Unanswered questions',
  content: () => <QuestionsList type={QuestionTypes.Answered} />
},
{
  label: 'Answered questions',
  content: () => <QuestionsList type={QuestionTypes.Unanswered} />
}];

const Home = () => (
  <div>
    <Tabs tabs={tabs} />
  </div>
);

export default Home;
