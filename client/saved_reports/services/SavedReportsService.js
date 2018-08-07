SavedReportsService.$inject = ['lodash', 'api', 'session'];

/**
 * @ngdoc service
 * @module superdesk.apps.analytics
 * @name savedReports
 * @requires lodash
 * @requires api
 * @requires session
 * @description Service to create, read, update and delete saved reports
 */
export function SavedReportsService(_, api, session) {
    /**
     * @ngdoc method
     * @name savedReports#fetchById
     * @param {String} reportId - The ID of the saved report
     * @return {Promise<Object>} - The report (if found)
     * @description Fetch a report by its ID from the server
     */
    this.fetchById = (reportId) => (
        api('saved_reports').getById(reportId)
    );

    /**
     * @ngdoc method
     * @name savedReports#fetchAll
     * @param {String} reportType - The report type to load
     * @param {Number} page - The page number to load
     * @return {Promise<Object>} - User/Global report arrays
     * @description Fetch the User and Global reports for the provided report type
     */
    this.fetchAll = (reportType, page = 1) => (
        api('saved_reports').query({
            max_results: 200,
            page: page,
            where: JSON.stringify({report: reportType})
        })
            .then((result) => ({
                user: _.filter(result._items, (report) => report.user === session.identity._id),
                global: _.filter(result._items, (report) => report.user !== session.identity._id),
            }))
    );

    /**
     * @ngdoc method
     * @name savedReports#save
     * @param {object} updates - The updates to apply
     * @param {object} original - The original saved report
     * @return {Promise<object>} - The created/updated report
     * @description Creates or updates a saved report
     */
    this.save = (updates, original = {}) => (
        api('saved_reports').save(
            _.get(original, '_id') ? original : {},
            _.pickBy(updates, (value, key) => !key.startsWith('_'))
        )
    );

    /**
     * @ngdoc method
     * @name savedReports#remove
     * @param {object} report - The report to remove
     * @return {Promise} - Resolves with the server response
     * @description Deletes a saved report
     */
    this.remove = (report) => (
        api('saved_reports', session.identity).remove(report)
    );
}
