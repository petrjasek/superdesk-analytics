# -*- coding: utf-8; -*-
#
# This file is part of Superdesk.
#
# Copyright 2018 Sourcefabric z.u. and contributors.
#
# For the full copyright and license information, please see the
# AUTHORS and LICENSE files distributed with this source code, or
# at https://www.sourcefabric.org/superdesk/license

from superdesk import get_resource_service
from collections import namedtuple

report_types = [
    'activity_report',
    'content_quota_report',
    'processed_items_report',
    'source_category_report',
    'track_activity_report'
]

REPORT_TYPES = namedtuple('REPORT_TYPES', [
    'ACTIVITY',
    'CONTENT_QUOTA',
    'PROCESSED_ITEMS',
    'SOURCE_CATEGORY',
    'TRACK_ACTIVITY'
])(*report_types)

mime_types = [
    'image/png',
    'image/jpeg',
    'image/gif',
    'application/pdf',
    'image/svg+xml',
    'text/csv'
]

MIME_TYPES = namedtuple('MIME_TYPES', [
    'PNG',
    'JPEG',
    'GIF',
    'PDF',
    'SVG',
    'CSV'
])(*mime_types)


def get_mime_type_extension(mimetype):
    if mimetype == MIME_TYPES.PNG:
        return 'png'
    elif mimetype == MIME_TYPES.JPEG:
        return 'jpeg'
    elif mimetype == MIME_TYPES.GIF:
        return 'gif'
    elif mimetype == MIME_TYPES.PDF:
        return 'pdf'
    elif mimetype == MIME_TYPES.SVG:
        return 'svg'
    elif mimetype == MIME_TYPES.CSV:
        return 'csv'


def get_report_service(report_type):
    if report_type == REPORT_TYPES.ACTIVITY:
        return get_resource_service('activity_report')
    elif report_type == REPORT_TYPES.CONTENT_QUOTA:
        return get_resource_service('content_quota_report')
    elif report_type == REPORT_TYPES.PROCESSED_ITEMS:
        return get_resource_service('processed_items_report')
    elif report_type == REPORT_TYPES.SOURCE_CATEGORY:
        return get_resource_service('source_category_report')
    elif report_type == REPORT_TYPES.TRACK_ACTIVITY:
        return get_resource_service('track_activity_report')

    return None
