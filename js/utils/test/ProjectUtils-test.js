
const expect = require('expect');
const ProjectUtils = require('../ProjectUtils');

describe('test ProjectUtils', () => {

    it('test formatAvailableStyles', () => {
        const styleCapabilities = [
            {
                Name: 'style001',
                Legend: {}
            },
            {
                Name: 'style002',
                Legend: {}
            }
        ];

        const availableStyles = ProjectUtils.formatAvailableStyles(styleCapabilities);
        expect(availableStyles).toEqual([
            {
                name: 'style001'
            },
            {
                name: 'style002'
            }
        ]);

        const updateLocale = ProjectUtils.formatAvailableStyles(availableStyles);

        expect(updateLocale).toEqual([
            {
                name: 'style001'
            },
            {
                name: 'style002'
            }
        ]);
    });

    it('test formatAvailableStyles empty', () => {
        const availableStyles = ProjectUtils.formatAvailableStyles([]);
        expect(availableStyles).toEqual(null);
    });
});
