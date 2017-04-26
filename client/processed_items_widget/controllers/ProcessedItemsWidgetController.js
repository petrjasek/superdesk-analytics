ProcessedItemsWidgetController.$inject = ['$scope', '$rootScope', 'api', 'session', 'analyticsWidgetSettings', 
'notify', 'processedItemsChart', '$interval'];

/**
 * @ngdoc controller
 * @module superdesk.apps.analytics.processed-items-widget
 * @name ProcessedItemsWidgetController
 * @requires $scope
 * @requires $rootScope
 * @requires api
 * @requires session
 * @requires analyticsWidgetSettings
 * @requires notify
 * @requires processedItemsChart
 * @requires $interval
 * @description Controller for processed items widget
 */
export function ProcessedItemsWidgetController($scope, $rootScope, api, session, analyticsWidgetSettings,
 notify, processedItemsChart, $interval) {
    var widgetType = 'processed_items';

    /**
     * @ngdoc method
     * @name ProcessedItemsWidgetController#getSettings
     * @description Read widget settings
     */
    var getSettings = function() {
        return analyticsWidgetSettings.readSettings(widgetType).then((preferences) => {
            $scope.widget = preferences;
            return $scope.widget;
        });
    };

    /**
     * @ngdoc method
     * @name ProcessedItemsWidgetController#generateReport
     * @description Generate the report
     */
    var generateReport = function() {
        function onSuccess(processedItemsReport) {
            $scope.processedItemsReport = processedItemsReport;
            return $scope.processedItemsReport;
        }

        function onFail(error) {
            if (angular.isDefined(error.data._message)) {
                notify.error(error.data._message);
            } else {
                notify.error(gettext('Error. The processed items report could not be generated.'));
            }
        }

        return getSettings().then((settings) =>
            api('processed_items_report', session.identity).save({}, settings)
                .then(onSuccess, onFail)
        );
    };


    /**
     * @ngdoc method
     * @name ProcessedItemsWidgetController#generateChart
     * @description Generate the chart
     */
    var generateChart = function() {
        generateReport().then((processedItemsReport) => {
            $scope.processedItemsReport = processedItemsReport;
            processedItemsChart.createChart(processedItemsReport, 'containerp');
        });
    };

    generateChart();

    $scope.$on('view:processed_items_widget', (event, args) => {
        generateChart();
    });

    $interval(generateChart, 60000);
}
