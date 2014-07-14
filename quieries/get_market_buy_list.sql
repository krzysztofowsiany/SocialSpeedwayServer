SELECT p.name, p.wear, p.price, g.name FROM parts p
LEFT JOIN partgroups g ON g.partGroupID = p.partGroupID
WHERE p.status = 0;
;