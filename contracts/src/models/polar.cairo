use cubit::f128::types::fixed::{Fixed, FixedTrait};

trait PolarTrait {
    fn get_boat_speed(wind_spd: Fixed, angle: Fixed) -> Fixed;
}

fn find_interval(values: Span<(Fixed, Fixed)>, angle: Fixed, index: u32) -> (Fixed, Fixed, Fixed, Fixed) {
    if (index + 1 > values.len()) {
        (
            FixedTrait::new_unscaled(0, false),
            FixedTrait::new_unscaled(0, false), 
            FixedTrait::new_unscaled(0, false), 
            FixedTrait::new_unscaled(0, false)
        )
    } else {
        let (min_angle, min_spd): @(Fixed, Fixed) = values.at(index);
        if (index + 1 == values.len()) {
            if (angle == min_angle.clone()) {
                (min_angle.clone(), min_spd.clone(),min_angle.clone(), min_spd.clone())
            } else {
                find_interval(values, angle, index + 1)
            }
        } else {
            // lookup next angle
            let (max_angle, max_spd): @(Fixed, Fixed) = values.at(index + 1);
            if (angle >= min_angle.clone()) && (angle < max_angle.clone()) {
                (min_angle.clone(), min_spd.clone(), max_angle.clone(), max_spd.clone())
            } else {
                find_interval(values, angle, index + 1)
            }
        }

    }
}

impl PolarImpl of PolarTrait {
    fn get_boat_speed(wind_spd: Fixed, angle: Fixed) -> Fixed {
        // assert(wind_spd == 6_u8);
        // WIND_SPEED = 6 KnT
        let mut values: Array<(Fixed, Fixed)> = ArrayTrait::new();
        values.append((FixedTrait::from_unscaled_felt(41), FixedTrait::new(110495997000000000000_u128, false))); // 5.99
        values.append((FixedTrait::from_unscaled_felt(52), FixedTrait::new(124884457400000000000_u128, false))); // 6.77
        values.append((FixedTrait::from_unscaled_felt(60), FixedTrait::new(130787415500000000000_u128, false))); // 7.09 
        values.append((FixedTrait::from_unscaled_felt(70), FixedTrait::new(134107829400000000000_u128, false))); // 7.27 
        values.append((FixedTrait::from_unscaled_felt(75), FixedTrait::new(134661231700000000000_u128, false))); // 7.30 
        values.append((FixedTrait::from_unscaled_felt(80), FixedTrait::new(134476764300000000000_u128, false))); // 7.29 
        values.append((FixedTrait::from_unscaled_felt(90), FixedTrait::new(132816557300000000000_u128, false))); // 7.20 
        values.append((FixedTrait::from_unscaled_felt(110), FixedTrait::new(119165966700000000000_u128, false))); // 6.46 
        values.append((FixedTrait::from_unscaled_felt(120), FixedTrait::new(108282387700000000000_u128, false))); // 5.87 
        values.append((FixedTrait::from_unscaled_felt(135), FixedTrait::new(89466708760000000000_u128, false))); // 4.85 
        values.append((FixedTrait::from_unscaled_felt(150), FixedTrait::new(79689934400000000000_u128, false))); // 4.32 
        values.append((FixedTrait::from_unscaled_felt(165), FixedTrait::new(74893780940000000000_u128, false))); // 4.06 
        values.append((FixedTrait::from_unscaled_felt(174), FixedTrait::new(73418041410000000000_u128, false))); // 3.98 
        values.append((FixedTrait::from_unscaled_felt(180), FixedTrait::new(72680171650000000000_u128, false))); // 3.94 

        // values.append((FixedTrait::from_unscaled_felt(41), FixedTrait::from_unscaled_felt(6)));
        // values.append((FixedTrait::from_unscaled_felt(52), FixedTrait::from_unscaled_felt(7)));
        // values.append((FixedTrait::from_unscaled_felt(60), FixedTrait::from_unscaled_felt(7)));
        // values.append((FixedTrait::from_unscaled_felt(70), FixedTrait::from_unscaled_felt(7)));
        // values.append((FixedTrait::from_unscaled_felt(75), FixedTrait::from_unscaled_felt(7)));
        // values.append((FixedTrait::from_unscaled_felt(80), FixedTrait::from_unscaled_felt(7)));
        // values.append((FixedTrait::from_unscaled_felt(90), FixedTrait::from_unscaled_felt(8)));
        // values.append((FixedTrait::from_unscaled_felt(110), FixedTrait::from_unscaled_felt(6)));
        // values.append((FixedTrait::from_unscaled_felt(120), FixedTrait::from_unscaled_felt(6)));
        // values.append((FixedTrait::from_unscaled_felt(135), FixedTrait::from_unscaled_felt(5)));
        // values.append((FixedTrait::from_unscaled_felt(150), FixedTrait::from_unscaled_felt(4)));
        // values.append((FixedTrait::from_unscaled_felt(165), FixedTrait::from_unscaled_felt(4)));
        // values.append((FixedTrait::from_unscaled_felt(174), FixedTrait::from_unscaled_felt(4)));
        // values.append((FixedTrait::from_unscaled_felt(180), FixedTrait::from_unscaled_felt(3)));

        let (first_angle, first_speed): (Fixed, Fixed) = values.at(0).clone();
        if angle < first_angle {
            FixedTrait::from_unscaled_felt(0)
        } else {
            let (min_angle, min_spd, max_angle, max_spd) = find_interval(values.span(), angle, 0_u32);
            let result: Fixed = (min_spd + max_spd) / FixedTrait::from_unscaled_felt(2);
            result
        }
    }
}