const buttonTemplate = `
<button class="{{ className }}" type={{ type }}>
  {{#if image}}
  <img src="{{image}}" alt="{{alt}}"/>
  {{else}}
  {{{label}}}
  {{/if}}
</button>
`;

export default buttonTemplate;
