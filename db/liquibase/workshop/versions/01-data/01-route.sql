
-- operations: 1=read 2=list 3=export 4=update 5=bulk-update 6=create 7=bulk-create 8=archive 9=bulk-archive 10=delete 11=bulk-delete 12=bulk-sync 13=execute
-- methodIds:  1=GET  2=POST  3=PUT   4=PATCH  5=DELETE      6=HEAD  7=OPTIONS
-- Note: OPTIONS is handled statically by corsMiddleware before checkRoute — not stored in methodIds

INSERT INTO route (pattern, name, description, protected, "creatorId", "creatorName") VALUES                         
  -- routes (3)
  ('/search',             'searchRoutes',    'Search routes',        true, -1, 'system'),
  ('/(?<id>\d+)/history', 'getRouteHistory', 'Manage route history', true, -1, 'system'),
  ('',                    'updateRoutes',    'Update routes',        true, -1, 'system'),
  ('',                    'addRoutes',       'Add routes',           true, -1, 'system'),
  ('/archive',            'archiveRoutes',   'Archive routes',       true, -1, 'system')
  
ON CONFLICT DO NOTHING;

ANALYZE;

