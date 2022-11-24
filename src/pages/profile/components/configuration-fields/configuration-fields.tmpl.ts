const configurationFieldsTemplate = `
<table class="profile-table configuration-table">
    <tbody>
        {{#each configFields}}
        <tr class="configuration-row">
            <td class="profile-table-cell"><a class="anchor configuration-link" href="{{this.path}}">{{this.text}}</a></td>
        </tr>
        {{/each}}
    </tbody>
</table>`;

export default configurationFieldsTemplate;